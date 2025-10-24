import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "@/contexts/UserContext";

type StoredUser = {
  name: string;
  email: string;
  password: string;
  role: "user" | "partner" | "policymaker";
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, users, seedDemoUsers } = useUser();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // no-op: users are provided by UserContext
  }, []);

  const onSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);

    const res = login(email, password);
    if (!res.success) {
      setError(res.message || "Login failed");
      return;
    }

    const user = res.user!;
    if (user.role === "partner") navigate("/partner-dashboard");
    else if (user.role === "policymaker") navigate("/policy-dashboard");
    else navigate("/");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/bg-image.jpg')" }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-background/30 backdrop-blur-sm" />

      <Card className="w-full max-w-md p-6 relative z-10 bg-background/80 backdrop-blur-md border-2 shadow-2xl">
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="EatWise Logo" className="h-20 w-auto" />
        </div>
        <h2 className="text-xl font-semibold mb-2 text-center">Welcome back</h2>
        <p className="text-sm text-muted-foreground mb-4 text-center">
          Sign in with your email and password
        </p>

        <form onSubmit={onSubmit} className="space-y-3">
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

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>

        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-primary">
              Register
            </Link>
          </p>
          <div className="mt-2">
            <p className="font-medium">Demo credentials</p>
            <ul className="text-xs list-disc ml-5">
              <li>User — rajesh.kumar@example.com / user123</li>
              <li>Partner — priya.partner@example.com / partner123</li>
              <li>Policy maker — sanjay.policy@example.com / policy123</li>
            </ul>
            <div className="mt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  seedDemoUsers();
                  alert("Demo users reset in memory");
                }}
              >
                Reset demo users
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
