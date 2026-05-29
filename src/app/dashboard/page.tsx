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

const COLORS = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b'];

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
          <h1 className="text-4xl font-black font-headline tracking-tighter text-foreground flex items-center gap-3">
            Career Dashboard
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
          </h1>
          <p className="text-muted-foreground font-medium text-lg">Your AI-powered journey to professional excellence.</p>
        </div>
        <Link href="/dashboard/upload">
          <Button className="rounded-2xl h-14 px-8 text-lg font-bold shadow-2xl shadow-primary/20 hover:scale-105 transition-all">
            <Plus className="mr-2 h-6 w-6" /> Analyze Resume
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Average ATS Score" 
          value="82" 
          icon={Award} 
          trend="12%" 
          trendUp 
          className="rounded-[2rem] bg-mesh border-none"
        />
        <StatCard 
          title="Expertise Units" 
          value="48" 
          icon={Zap} 
          trend="4" 
          trendUp 
          className="rounded-[2rem] bg-mesh border-none"
        />
        <StatCard 
          title="Total Analyses" 
          value="12" 
          icon={FileCheck} 
          className="rounded-[2rem] bg-mesh border-none"
        />
        <StatCard 
          title="Market Match" 
          value="156" 
          icon={Briefcase} 
          trend="24%" 
          trendUp 
          className="rounded-[2rem] bg-mesh border-none"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-7">
        <Card className="lg:col-span-4 rounded-[2.5rem] border-none shadow-sm overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-black font-headline">Strength Trend</CardTitle>
                <CardDescription>Visualizing your profile optimization over time.</CardDescription>
              </div>
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[320px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 600}} 
                  dy={10} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 600}} 
                  dx={-10} 
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '1.25rem', 
                    border: 'none', 
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                    padding: '12px 16px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorScore)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-mesh">
          <CardHeader>
            <CardTitle className="text-xl font-black font-headline">Skill Archetype</CardTitle>
            <CardDescription>Distribution of your core competencies.</CardDescription>
          </CardHeader>
          <CardContent className="h-[320px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={skillDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={8}
                  dataKey="value"
                  cornerRadius={10}
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
        <Card className="lg:col-span-8 rounded-[2.5rem] border-none shadow-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/20 px-8 py-6">
            <div>
              <CardTitle className="text-xl font-black font-headline">Recent Optimization Pipeline</CardTitle>
              <CardDescription>Track your most recent AI analysis sessions.</CardDescription>
            </div>
            <Button variant="ghost" className="rounded-xl font-bold text-primary hover:bg-primary/5">
              View History
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {recentResumes.map((resume) => (
                <div key={resume.id} className="flex items-center justify-between p-6 transition-colors hover:bg-muted/30 group">
                  <div className="flex items-center gap-5">
                    <div className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-2xl font-black text-lg shadow-sm transition-transform group-hover:scale-110 group-hover:rotate-3",
                      resume.score >= 90 ? "bg-emerald-100 text-emerald-700" : 
                      resume.score >= 80 ? "bg-indigo-100 text-indigo-700" : "bg-amber-100 text-amber-700"
                    )}>
                      {resume.score}
                    </div>
                    <div>
                      <p className="font-black text-base group-hover:text-primary transition-colors">{resume.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{resume.date}</p>
                        <span className="h-1 w-1 rounded-full bg-muted-foreground/30"></span>
                        <p className={cn(
                          "text-xs font-black uppercase tracking-widest",
                          resume.score >= 90 ? "text-emerald-600" : "text-amber-600"
                        )}>{resume.status}</p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl hover:bg-primary hover:text-white transition-all">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-gradient-to-br from-indigo-600 to-violet-700 border-none text-primary-foreground shadow-2xl rounded-[2.5rem] overflow-hidden relative p-8">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <CardContent className="p-0 relative z-10 space-y-6">
              <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Target className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black font-headline leading-tight">Pro Career Scouting</h3>
                <p className="text-indigo-100 font-medium text-sm leading-relaxed">
                  Join our exclusive network of elite professionals. Get direct introductions to top-tier recruiters.
                </p>
              </div>
              <Button variant="secondary" className="w-full h-14 rounded-2xl font-black text-lg bg-white text-indigo-700 hover:bg-indigo-50 shadow-xl shadow-black/20">
                Upgrade to Elite
              </Button>
            </CardContent>
          </Card>
          
          <div className="p-8 rounded-[2rem] border-2 border-primary/10 bg-primary/5 space-y-4">
             <div className="flex items-center gap-2 text-primary">
                <Sparkles className="h-5 w-5" />
                <h4 className="font-black text-sm uppercase tracking-widest">AI Tip of the Day</h4>
             </div>
             <p className="text-sm font-medium text-muted-foreground leading-relaxed">
               "Strong resumes focus on <span className="text-foreground font-bold underline decoration-primary underline-offset-4">quantifiable results</span>. Replace 'managed a team' with 'led a team of 15 to exceed KPIs by 30%'."
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}