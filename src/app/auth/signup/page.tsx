"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Cpu, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative bg-background">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
      
      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in duration-500">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
              <Cpu className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold font-headline tracking-tight text-primary">ResuMatch AI</span>
          </div>
        </div>

        <Card className="glass border-white/20 shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="space-y-2 text-center pb-2">
            <CardTitle className="text-3xl font-extrabold font-headline">Create Account</CardTitle>
            <CardDescription className="text-base">Join thousands of successful career seekers</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full-name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="full-name" placeholder="John Doe" className="pl-11 h-12 rounded-xl bg-white/50 border-white/30" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="name@example.com" className="pl-11 h-12 rounded-xl bg-white/50 border-white/30" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" className="h-12 rounded-xl bg-white/50 border-white/30" required />
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="terms" required />
                <label htmlFor="terms" className="text-xs text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  I agree to the <Link href="#" className="text-primary hover:underline">Terms of Service</Link> and <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>
                </label>
              </div>
              <Button type="submit" className="w-full h-12 rounded-xl font-bold text-lg shadow-xl shadow-primary/20 mt-4">
                Sign Up
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pt-4 pb-8">
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/auth/login" className="font-bold text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}