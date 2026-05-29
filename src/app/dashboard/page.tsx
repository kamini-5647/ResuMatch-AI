
"use client"

import { StatCard } from "@/components/dashboard/StatCard";
import { 
  AreaChart, 
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  FileCheck, 
  Target, 
  Award, 
  Briefcase,
  ExternalLink,
  Plus,
  TrendingUp,
  Sparkles,
  Zap,
  ArrowRight
} from 'lucide-react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const performanceData = [
  { name: 'Jan', score: 65 },
  { name: 'Feb', score: 72 },
  { name: 'Mar', score: 68 },
  { name: 'Apr', score: 85 },
  { name: 'May', score: 92 },
  { name: 'Jun', score: 88 },
];

const skillDistribution = [
  { name: 'Technical', value: 45 },
  { name: 'Soft Skills', value: 25 },
  { name: 'Management', value: 20 },
  { name: 'Strategy', value: 10 },
];

const COLORS = ['#4f46e5', '#0ea5e9', '#10b981', '#f59e0b'];

const recentResumes = [
  { id: 1, name: 'Senior_Architect_2024.pdf', score: 92, date: '2 hours ago', status: 'Optimal' },
  { id: 2, name: 'Lead_Developer_CV.pdf', score: 85, date: '1 day ago', status: 'Strong' },
  { id: 3, name: 'Product_Manager_Draft.pdf', score: 68, date: '3 days ago', status: 'Needs Improvement' },
];

export default function Dashboard() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-5xl font-black font-headline tracking-tighter text-foreground flex items-center gap-3">
            Career Portal
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
          </h1>
          <p className="text-muted-foreground font-medium text-lg">Your AI-powered journey to professional excellence.</p>
        </div>
        <Link href="/dashboard/upload">
          <Button className="rounded-2xl h-16 px-8 text-xl font-black shadow-2xl shadow-primary/20 hover:scale-105 transition-all">
            <Plus className="mr-2 h-6 w-6" /> Analyze Resume
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Avg. ATS Score" 
          value="82%" 
          icon={Award} 
          trend="12%" 
          trendUp 
          className="rounded-[2rem] bg-card border-none shadow-xl shadow-primary/5"
        />
        <StatCard 
          title="Skill Delta" 
          value="+48" 
          icon={Zap} 
          trend="4" 
          trendUp 
          className="rounded-[2rem] bg-card border-none shadow-xl shadow-primary/5"
        />
        <StatCard 
          title="Analyses Run" 
          value="12" 
          icon={FileCheck} 
          className="rounded-[2rem] bg-card border-none shadow-xl shadow-primary/5"
        />
        <StatCard 
          title="Job Pipeline" 
          value="156" 
          icon={Briefcase} 
          trend="24%" 
          trendUp 
          className="rounded-[2rem] bg-card border-none shadow-xl shadow-primary/5"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-7">
        <Card className="lg:col-span-4 rounded-[2.5rem] border-none shadow-xl shadow-primary/5 overflow-hidden bg-card">
          <CardHeader className="pb-2 p-8">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-black font-headline">Strength Metrics</CardTitle>
                <CardDescription>Visualizing your profile optimization over time.</CardDescription>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[350px] pt-4 p-8">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 13, fontWeight: 700}} 
                  dy={15} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 13, fontWeight: 700}} 
                  dx={-15} 
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '1.5rem', 
                    border: 'none', 
                    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)',
                    padding: '16px 24px',
                    fontWeight: 700
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={5} 
                  fillOpacity={1} 
                  fill="url(#colorScore)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 rounded-[2.5rem] border-none shadow-xl shadow-primary/5 overflow-hidden bg-mesh">
          <CardHeader className="p-8">
            <CardTitle className="text-2xl font-black font-headline">Skill Profile</CardTitle>
            <CardDescription>Breakdown of your professional core.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] flex items-center justify-center p-8">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={skillDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={10}
                  dataKey="value"
                  cornerRadius={15}
                  stroke="none"
                >
                  {skillDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <Card className="lg:col-span-8 rounded-[2.5rem] border-none shadow-xl shadow-primary/5 overflow-hidden bg-card">
          <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/30 px-8 py-8">
            <div>
              <CardTitle className="text-2xl font-black font-headline">Analysis Pipeline</CardTitle>
              <CardDescription>Historical tracking of your resume variants.</CardDescription>
            </div>
            <Button variant="outline" className="rounded-xl font-bold border-2 px-6">
              Full History
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {recentResumes.map((resume) => (
                <div key={resume.id} className="flex items-center justify-between p-8 transition-colors hover:bg-muted/30 group">
                  <div className="flex items-center gap-6">
                    <div className={cn(
                      "flex h-16 w-16 items-center justify-center rounded-[1.25rem] font-black text-xl shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3",
                      resume.score >= 90 ? "bg-emerald-500 text-white" : 
                      resume.score >= 80 ? "bg-primary text-white" : "bg-amber-500 text-white"
                    )}>
                      {resume.score}
                    </div>
                    <div>
                      <p className="font-black text-lg group-hover:text-primary transition-colors">{resume.name}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <p className="text-xs text-muted-foreground font-black uppercase tracking-[0.2em]">{resume.date}</p>
                        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30"></span>
                        <p className={cn(
                          "text-xs font-black uppercase tracking-[0.2em]",
                          resume.score >= 90 ? "text-emerald-600" : "text-amber-600"
                        )}>{resume.status}</p>
                      </div>
                    </div>
                  </div>
                  <Button variant="secondary" size="icon" className="h-12 w-12 rounded-2xl hover:bg-primary hover:text-white transition-all">
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-4 space-y-8">
          <Card className="bg-primary text-primary-foreground shadow-2xl rounded-[2.5rem] overflow-hidden relative p-10 group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl group-hover:scale-110 transition-transform"></div>
            <CardContent className="p-0 relative z-10 space-y-8">
              <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Target className="h-10 w-10" />
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-black font-headline leading-tight">Career Scouting</h3>
                <p className="text-primary-foreground/80 font-medium text-base leading-relaxed">
                  Unlock access to hidden roles and direct recruiter referrals with our elite network.
                </p>
              </div>
              <Button variant="secondary" className="w-full h-16 rounded-2xl font-black text-lg bg-white text-primary hover:bg-primary-foreground shadow-xl shadow-black/10">
                Go Elite
              </Button>
            </CardContent>
          </Card>
          
          <div className="p-8 rounded-[2.5rem] border-2 border-primary/10 bg-primary/5 space-y-4">
             <div className="flex items-center gap-2 text-primary">
                <Sparkles className="h-6 w-6" />
                <h4 className="font-black text-xs uppercase tracking-[0.2em]">AI Career Hack</h4>
             </div>
             <p className="text-sm font-bold text-muted-foreground leading-relaxed">
               "Resumes with <span className="text-foreground font-black underline decoration-primary decoration-2 underline-offset-4">quantified achievements</span> get 3x more views. Use metrics like revenue, time saved, or team size."
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
