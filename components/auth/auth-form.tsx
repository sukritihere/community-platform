"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { MagicCard } from "@/components/ui/magic-card";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { Sparkles } from "@/components/ui/sparkles";
import { Meteors } from "@/components/ui/meteors";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Users } from "lucide-react";
import { motion } from "framer-motion";

interface AuthFormProps {
  mode: "login" | "register";
}

export function AuthForm({ mode }: AuthFormProps) {
  const { login, register } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let success = false;

      if (mode === "login") {
        success = await login(formData.email, formData.password);
      } else {
        success = await register(
          formData.name,
          formData.email,
          formData.password,
          formData.bio
        );
      }

      if (success) {
        router.push("/");
      }
    } catch (error) {
      console.error("Auth form error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 aurora-bg opacity-40" />
      <Meteors number={40} className="opacity-100" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-6 relative z-10"
      >
        <div className="text-center space-y-2">
          <motion.div
            className="flex justify-center"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Users className="h-12 w-12 text-primary" />
          </motion.div>
          <Sparkles>
            <AnimatedGradientText className="text-4xl font-bold">
              Community Platform
            </AnimatedGradientText>
          </Sparkles>
          <p className="text-muted-foreground">
            {mode === "login"
              ? "Welcome back! Sign in to your account"
              : "Join our professional community"}
          </p>
        </div>

        <MagicCard
          gradientColor="#8B5CF6"
          className="backdrop-blur-md bg-background/80"
        >
          <CardHeader className="text-center">
            <CardTitle>
              {mode === "login" ? "Sign In" : "Create Account"}
            </CardTitle>
            <CardDescription>
              {mode === "login"
                ? "Enter your credentials to access your account"
                : "Fill in your information to get started"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "register" && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="bg-background/50 backdrop-blur-sm"
                    />
                  </motion.div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="bg-background/50 backdrop-blur-sm"
                  />
                </motion.div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                    minLength={6}
                    className="bg-background/50 backdrop-blur-sm"
                  />
                </motion.div>
              </div>

              {mode === "register" && (
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio (Optional)</Label>
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell us about yourself..."
                      className="resize-none bg-background/50 backdrop-blur-sm"
                      rows={3}
                      maxLength={200}
                    />
                  </motion.div>
                  <p className="text-xs text-muted-foreground">
                    {formData.bio.length}/200 characters
                  </p>
                </div>
              )}

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {mode === "login" ? "Sign In" : "Create Account"}
                </Button>
              </motion.div>
            </form>

            <div className="mt-6 text-center text-sm">
              {mode === "login" ? (
                <p className="text-muted-foreground">
                  Don't have an account?{" "}
                  <Link
                    href="/auth/register"
                    className="text-primary hover:underline font-medium"
                  >
                    Sign up
                  </Link>
                </p>
              ) : (
                <p className="text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="text-primary hover:underline font-medium"
                  >
                    Sign in
                  </Link>
                </p>
              )}
            </div>
          </CardContent>
        </MagicCard>
      </motion.div>
    </div>
  );
}
