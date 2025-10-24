import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  gender: "male" | "female" | "other";
  avatar: string;
}

interface UserContextType {
  userProfile: UserProfile;
  updateProfile: (profile: Partial<UserProfile>) => void;
  generateAvatar: (name: string, gender: "male" | "female" | "other") => string;
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

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Asha Verma",
    email: "asha.sharma@email.com",
    phone: "+91 98765 43210",
    location: "Maharashtra",
    gender: "female",
    avatar: generateAvatar("Asha Verma", "female"),
  });

  const updateProfile = (profile: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...profile }));
  };

  return (
    <UserContext.Provider
      value={{ userProfile, updateProfile, generateAvatar }}
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
