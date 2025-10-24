import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "@/contexts/UserContext";

type StoredUser = {
  name: string;
  email: string;
  password: string;
  role: "user" | "partner" | "policymaker";
};

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<StoredUser["role"]>("user");
  const { register, users } = useUser();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    // users come from context
  }, []);

  const onSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required.");
      return;
    }

    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      setError("An account with this email already exists.");
      return;
    }

    const newUser: StoredUser = {
      name: name.trim(),
      email: email.trim(),
      password,
      role,
    };
    const res = register(newUser);
    if (!res.success) {
      setError(res.message || "Failed to register");
      return;
    }

    const created = res.user!;
    if (created.role === "partner") navigate("/partnerships");
    else if (created.role === "policymaker") navigate("/policy-dashboard");
    else navigate("/");
  };

  return (
    <MobileLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md p-6">
          <h2 className="text-xl font-semibold mb-2">Create an account</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Sign up with your email and choose a role
          </p>

          <form onSubmit={onSubmit} className="space-y-3">
            <Input
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div>
              <Select
                value={role}
                onValueChange={(v) => setRole(v as StoredUser["role"])}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="partner">Partner</SelectItem>
                  <SelectItem value="policymaker">Policy maker</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>

          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-primary">
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default Register;
