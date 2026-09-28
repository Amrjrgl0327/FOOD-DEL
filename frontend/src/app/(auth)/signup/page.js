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

export default function SignUp() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormValues({ ...formValues, [name]: value });
  };

  const validateEmail = (email) => {
    if (email === "") {
      setEmailError("Email is required");
      return true;
    } else if (!email.includes("@")) {
      setEmailError("required valid email");
      return true;
    } else {
      setEmailError("");
      return false;
    }
  };

  const validatePasswordInput = (password) => {
    if (password === "") {
      setPasswordError("password is required");
      return true;
    } else if (password.length <= 8) {
      setPasswordError("Password length must be above 8");
      return true;
    } else {
      setPasswordError("");
      return false;
    }
  };

  const validateConfirmPasswordInput = (confirmPassword) => {
    if (confirmPassword === "") {
      setConfirmPasswordError("confirmPassword is required");
      return true;
    } else if (formValues.password !== confirmPassword) {
      setConfirmPasswordError("ConfirmPassword must match with password");
      return true;
    } else {
      setConfirmPasswordError("");
      return false;
    }
  };

  const handleSubmit = async () => {
    const emailError = validateEmail(formValues.email);
    const passwordError = validatePasswordInput(formValues.password);
    const confirmPasswordError = validateConfirmPasswordInput(
      formValues.confirmPassword,
    );

    if (!emailError && !passwordError && !confirmPasswordError) {
      setIsSubmitting(true);
      try {
        console.log("we can call api now");
        const response = await server.post("/auth/sign-up", {
          email: formValues.email,
          password: formValues.password,
        });

        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);

        router.push("/");
      } catch (err) {
        console.log(err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6"></div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                placeholder="m@example.com"
                value={formValues.email}
                name="email"
                onChange={handleInput}
              />
              {emailError && <div style={{ color: "red" }}>{emailError}</div>}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
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

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Confirm Password</Label>
              </div>
              <Input
                placeholder="confirm password"
                name="confirmPassword"
                type="password"
                value={formValues.confirmPassword}
                onChange={handleInput}
              />
              {confirmPasswordError && (
                <div style={{ color: "red" }}>{confirmPasswordError}</div>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting" : "Sign up"}
          </Button>

          <div className="flex items-center justify-center gap-1">
            <p>Already have an account?</p>
            <CardAction>
              <Button variant="link" className="h-auto p-0">
                Log In
              </Button>
            </CardAction>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
