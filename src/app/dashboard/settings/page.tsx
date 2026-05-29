"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Lock, 
  Bell, 
  Shield, 
  Globe,
  Camera,
  Mail,
  Linkedin,
  Github
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and career profile.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-4 space-y-4">
          <Card className="border-none shadow-sm bg-primary text-primary-foreground">
            <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
              <div className="relative group">
                <Avatar className="h-24 w-24 border-4 border-white/20">
                  <AvatarImage src="https://picsum.photos/seed/user/200/200" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-white text-primary flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div>
                <h3 className="text-xl font-bold font-headline">John Doe</h3>
                <p className="text-sm opacity-80 uppercase tracking-widest font-medium">Senior Developer</p>
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="secondary" size="icon" className="h-9 w-9 bg-white/10 hover:bg-white/20 border-none text-white">
                  <Mail className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon" className="h-9 w-9 bg-white/10 hover:bg-white/20 border-none text-white">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon" className="h-9 w-9 bg-white/10 hover:bg-white/20 border-none text-white">
                  <Github className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <nav className="space-y-1">
            {[
              { label: 'General Profile', icon: User, active: true },
              { label: 'Security & Password', icon: Lock },
              { label: 'Notifications', icon: Bell },
              { label: 'Privacy & Data', icon: Shield },
              { label: 'Global Preferences', icon: Globe },
            ].map((item, i) => (
              <button 
                key={i}
                className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  item.active 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="md:col-span-8 space-y-8">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="font-headline">Personal Information</CardTitle>
              <CardDescription>This information will be used for your AI resume tailoring.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" defaultValue="John" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" defaultValue="Doe" className="h-11" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" defaultValue="john.doe@example.com" className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Professional Headline</Label>
                <Input id="bio" defaultValue="Senior Full Stack Engineer specializing in React & Node.js" className="h-11" />
              </div>
              <div className="pt-4 flex justify-end">
                <Button className="rounded-xl px-8 h-12" onClick={handleSave} disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="font-headline">Job Preferences</CardTitle>
              <CardDescription>Customize how our AI scouts for roles on your behalf.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-xl border bg-accent/30">
                <div className="space-y-0.5">
                  <Label className="text-base font-bold font-headline">Open to Remote Roles</Label>
                  <p className="text-sm text-muted-foreground">Prioritize remote-first companies in your feed.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border bg-accent/30">
                <div className="space-y-0.5">
                  <Label className="text-base font-bold font-headline">Show Salary Estimates</Label>
                  <p className="text-sm text-muted-foreground">Display AI-calculated salary ranges when hidden.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border bg-accent/30">
                <div className="space-y-0.5">
                  <Label className="text-base font-bold font-headline">Direct Recruiter Outreach</Label>
                  <p className="text-sm text-muted-foreground">Allow verified recruiters to message you.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
