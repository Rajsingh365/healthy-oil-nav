import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  gender?: "male" | "female" | "other";
  avatar?: string;
}

type AuthUser = {
  name: string;
  email: string;
  role: "user" | "partner" | "policymaker";
};

type StoredUser = AuthUser & { password: string };

interface UserContextType {
  // profile editing
  userProfile: UserProfile | null;
  updateProfile: (profile: Partial<UserProfile>) => void;
  generateAvatar: (name: string, gender: "male" | "female" | "other") => string;

  // auth
  currentUser: AuthUser | null;
  users: StoredUser[];
  login: (
    email: string,
    password: string
  ) => { success: boolean; message?: string; user?: AuthUser };
  register: (user: StoredUser) => {
    success: boolean;
    message?: string;
    user?: AuthUser;
  };
  logout: () => void;
  seedDemoUsers: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const generateAvatar = (
    name: string,
    gender: "male" | "female" | "other"
  ) => {
    const genderPath =
      gender === "male" ? "boy" : gender === "female" ? "girl" : "boy";
    return `https://avatar.iran.liara.run/public/${genderPath}?username=${encodeURIComponent(
      name
    )}`;
  };

  // demo users (in-memory). No localStorage used per request.
  const demoUsers: StoredUser[] = [
    {
      name: "Rajesh Kumar",
      email: "rajesh.kumar@example.com",
      password: "user123",
      role: "user",
    },
    {
      name: "Priya Sharma",
      email: "priya.partner@example.com",
      password: "partner123",
      role: "partner",
    },
    {
      name: "Sanjay Mehta",
      email: "sanjay.policy@example.com",
      password: "policy123",
      role: "policymaker",
    },
  ];

  const [users, setUsers] = useState<StoredUser[]>(demoUsers);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const seedDemoUsers = () => {
    setUsers(demoUsers);
  };

  const updateProfile = (profile: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...(prev ?? {}), ...profile } as UserProfile));
  };

  const login = (email: string, password: string) => {
    const e = email.trim().toLowerCase();
    const found = users.find((u) => u.email.toLowerCase() === e);
    if (!found)
      return { success: false, message: "No account found with that email." };
    if (found.password !== password)
      return { success: false, message: "Invalid password." };

    const authUser: AuthUser = {
      name: found.name,
      email: found.email,
      role: found.role,
    };
    setCurrentUser(authUser);
    // set a simple profile for editing
    setUserProfile({
      name: found.name,
      email: found.email,
      avatar: generateAvatar(found.name, "male"),
    });
    return { success: true, user: authUser };
  };

  const register = (user: StoredUser) => {
    const exists = users.some(
      (u) => u.email.toLowerCase() === user.email.toLowerCase()
    );
    if (exists)
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    setUsers((prev) => [user, ...prev]);
    const authUser: AuthUser = {
      name: user.name,
      email: user.email,
      role: user.role,
    };
    setCurrentUser(authUser);
    setUserProfile({
      name: user.name,
      email: user.email,
      avatar: generateAvatar(user.name, "male"),
    });
    return { success: true, user: authUser };
  };

  const logout = () => {
    setCurrentUser(null);
    setUserProfile(null);
  };

  return (
    <UserContext.Provider
      value={{
        userProfile,
        updateProfile,
        generateAvatar,
        currentUser,
        users,
        login,
        register,
        logout,
        seedDemoUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
