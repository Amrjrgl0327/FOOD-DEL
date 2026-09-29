"use client";

import { server } from "@/app/_api/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateEmail = (email) => {
    if (email === "") {
      setEmailError("Email is required");
      return true;
    } else if (!email.includes("@")) {
      setEmailError("Required valid email");
      return true;
    } else {
      setEmailError("");
      return false;
    }
  };

  const validatePassword = (password) => {
    if (password === "") {
      setPasswordError("Password is required");
      return true;
    } else {
      setPasswordError("");
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError("");

    const hasEmailError = validateEmail(formValues.email);
    const hasPasswordError = validatePassword(formValues.password);

    if (hasEmailError || hasPasswordError) return;

    setIsSubmitting(true);
    try {
      const response = await server.post("/auth/login", {
        email: formValues.email,
        password: formValues.password,
      });

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);

      if (response.data.user.role === "ADMIN") {
        router.push("/admin/dishes");
      } else {
        router.push("/");
      }
    } catch (err) {
      setServerError(
        err?.response?.data?.message || "Email or Password is wrong",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Log In</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="m@example.com"
                  name="email"
                  value={formValues.email}
                  onChange={handleInput}
                />
                {emailError && <div style={{ color: "red" }}>{emailError}</div>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="password"
                  name="password"
                  type="password"
                  value={formValues.password}
                  onChange={handleInput}
                />
                {passwordError && (
                  <div style={{ color: "red" }}>{passwordError}</div>
                )}
              </div>

              {serverError && <div style={{ color: "red" }}>{serverError}</div>}
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2 mt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Log in"}
            </Button>

            <div className="flex items-center justify-center gap-1">
              <p>Don't have an account?</p>
              <CardAction>
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0"
                  onClick={() => router.push("/sign-up")}
                >
                  Sign Up
                </Button>
              </CardAction>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
