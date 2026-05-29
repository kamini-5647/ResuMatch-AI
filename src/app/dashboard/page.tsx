"use client"

import { StatCard } from "@/components/dashboard/StatCard";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
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
  Plus
} from 'lucide-react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  { name: 'Other', value: 10 },
];

const COLORS = ['#3B58E6', '#3BAEE6', '#10B981', '#6366F1'];

const recentResumes = [
  { id: 1, name: 'Software_Engineer_v2.pdf', score: 92, date: '2 days ago' },
  { id: 2, name: 'Full_Stack_Dev_Stripe.pdf', score: 85, date: '5 days ago' },
  { id: 3, name: 'Product_Manager_Lead.pdf', score: 68, date: '1 week ago' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">Overview</h1>
          <p className="text-muted-foreground">Track your resume performance and career progress.</p>
        </div>
        <Link href="/dashboard/upload">
          <Button className="rounded-xl px-6">
            <Plus className="mr-2 h-4 w-4" /> New Resume Analysis
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Average ATS Score" 
          value="82/100" 
          icon={Award} 
          trend="12%" 
          trendUp 
        />
        <StatCard 
          title="Skills Identified" 
          value="48" 
          icon={Target} 
          trend="4" 
          trendUp 
        />
        <StatCard 
          title="Total Analyses" 
          value="12" 
          icon={FileCheck} 
        />
        <StatCard 
          title="Job Matches" 
          value="156" 
          icon={Briefcase} 
          trend="24%" 
          trendUp 
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Resume Strength Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B58E6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B58E6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="score" stroke="#3B58E6" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Skill Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={skillDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
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

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-headline">Recent Analyses</CardTitle>
            <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentResumes.map((resume) => (
                <div key={resume.id} className="flex items-center justify-between p-4 rounded-xl bg-background border transition-hover hover:border-primary/50 group">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg font-bold text-xs",
                      resume.score >= 80 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    )}>
                      {resume.score}
                    </div>
                    <div>
                      <p className="font-medium text-sm group-hover:text-primary transition-colors">{resume.name}</p>
                      <p className="text-xs text-muted-foreground">{resume.date}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary border-none text-primary-foreground shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/20 rounded-full -ml-16 -mb-16 blur-3xl"></div>
          <CardContent className="p-8 relative z-10 space-y-6">
            <h3 className="text-2xl font-bold font-headline leading-tight">Unlock Premium Career Scouting</h3>
            <p className="text-primary-foreground/80 leading-relaxed">
              Get direct intros to hiring managers and priority processing for high-volume roles.
              Our premium users find jobs 2x faster.
            </p>
            <Button variant="secondary" className="w-full h-12 rounded-xl font-bold bg-white text-primary hover:bg-white/90">
              Upgrade to Pro
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
