"use client"

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Lightbulb,
  ArrowLeft,
  Download,
  Share2,
  Mail,
  Linkedin,
  MapPin,
  Calendar,
  Briefcase,
  Award,
  Zap,
  Target,
  FileText,
  Sparkles
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ResumeParsingOutput } from '@/ai/flows/resume-parsing';
import { ATSScoringOutput } from '@/ai/flows/ats-scoring';

export default function AnalysisResult() {
  const [data, setData] = useState<ResumeParsingOutput | null>(null);
  const [atsData, setAtsData] = useState<ATSScoringOutput | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedData = sessionStorage.getItem('resume_analysis');
    const savedAts = sessionStorage.getItem('ats_analysis');
    
    if (savedData) {
      setData(JSON.parse(savedData));
      if (savedAts) {
        setAtsData(JSON.parse(savedAts));
      }
    } else {
      router.push('/dashboard/upload');
    }
  }, [router]);

  if (!data) return null;

  const scoreValue = atsData?.atsScore ?? 84; 
  const scoreData = [
    { name: 'Score', value: scoreValue },
    { name: 'Remaining', value: 100 - scoreValue },
  ];
  
  const COLORS = ['#FFFFFF', 'rgba(255,255,255,0.15)'];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-2">
        <div className="flex items-center gap-5">
          <Button variant="outline" size="icon" onClick={() => router.push('/dashboard/upload')} className="rounded-2xl h-12 w-12 border-2 hover:bg-primary/5 transition-all">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-4xl font-extrabold font-headline tracking-tight">{data.contactDetails.name}</h1>
            <p className="text-muted-foreground font-medium flex items-center gap-2 mt-1">
              <FileText className="h-4 w-4 text-primary" />
              AI Analysis Report • Created Today
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-2xl h-11 px-5 border-2">
            <Download className="mr-2 h-4 w-4" /> PDF Report
          </Button>
          <Button className="rounded-2xl h-11 px-6 shadow-lg shadow-primary/20">
            <Share2 className="mr-2 h-4 w-4" /> Share Results
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column: Metrics & Main Stats */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="border-none shadow-2xl relative overflow-hidden bg-gradient-to-br from-primary via-primary to-indigo-700 text-primary-foreground p-2 rounded-[2.5rem]">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/20 rounded-full -ml-20 -mb-20 blur-3xl"></div>
            <CardHeader className="relative z-10 text-center space-y-0">
              <CardTitle className="text-2xl font-extrabold font-headline">ATS Score</CardTitle>
              <CardDescription className="text-primary-foreground/70 font-medium">Compatibility with industry standards</CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 flex flex-col items-center justify-center pt-2 pb-8 space-y-8">
              <div className="relative h-56 w-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={scoreData}
                      cx="50%"
                      cy="50%"
                      innerRadius={75}
                      outerRadius={100}
                      startAngle={225}
                      endAngle={-45}
                      dataKey="value"
                      stroke="none"
                      cornerRadius={40}
                    >
                      <Cell key="cell-0" fill={COLORS[0]} />
                      <Cell key="cell-1" fill={COLORS[1]} />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-6xl font-black font-headline tracking-tighter">{scoreValue}</span>
                  <span className="text-sm font-black uppercase tracking-[0.2em] opacity-70">Perfect</span>
                </div>
              </div>
              
              <div className="w-full space-y-4 px-4">
                <div className="flex items-center justify-between text-sm font-bold">
                  <span className="opacity-80">Keyword Match</span>
                  <span>{atsData?.skillMatchPercentage ?? 78}%</span>
                </div>
                <div className="h-3 w-full bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white transition-all duration-1000 delay-300" style={{ width: `${atsData?.skillMatchPercentage ?? 78}%` }} />
                </div>
                <p className="text-center text-sm font-medium opacity-90 pt-2 leading-relaxed">
                  Your profile shows <span className="underline decoration-accent underline-offset-4">strong alignment</span> with senior-level requirements.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-none shadow-sm bg-mesh overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg font-headline flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Missing Keywords
              </CardTitle>
              <CardDescription>Industry terms missing from your content.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {(atsData?.missingKeywords ?? ["AWS Architecture", "Kubernetes", "Microservices", "System Design", "FinOps", "Agile Leadership"]).map((keyword, i) => (
                  <Badge key={i} variant="outline" className="px-3 py-1.5 rounded-xl border-primary/20 bg-white text-primary font-bold text-xs">
                    + {keyword}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Experience & Breakdown */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card">
            <CardHeader className="bg-muted/30 border-b p-8">
              <CardTitle className="text-2xl font-extrabold font-headline">Professional Narrative</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-4 p-6 rounded-3xl bg-primary/5 border border-primary/10">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Email Address</p>
                      <p className="text-sm font-bold">{data.contactDetails.email}</p>
                    </div>
                  </div>
                  {data.contactDetails.phone && (
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                        <Briefcase className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Phone Number</p>
                        <p className="text-sm font-bold">{data.contactDetails.phone}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                   <div className="p-6 rounded-3xl bg-accent/5 border border-accent/10">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Professional Summary</p>
                    <p className="text-sm leading-relaxed text-foreground font-medium italic">
                      "{data.summary || "Strategically focused professional with a background in complex problem solving and team leadership."}"
                    </p>
                   </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-extrabold font-headline flex items-center gap-3">
                  <Briefcase className="h-6 w-6 text-primary" />
                  Experience Roadmap
                </h3>
                <div className="relative border-l-[3px] border-primary/10 ml-4 pl-8 space-y-12">
                  {data.experience.map((exp, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[43px] top-1 h-6 w-6 rounded-full border-[5px] border-primary bg-background shadow-lg"></div>
                      <div className="space-y-3 p-6 rounded-3xl bg-muted/20 hover:bg-muted/40 transition-colors border border-transparent hover:border-primary/10">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <h4 className="font-black font-headline text-lg text-primary">{exp.title}</h4>
                          <Badge variant="secondary" className="w-fit px-3 py-1 rounded-lg bg-white font-bold text-xs shadow-sm">
                            <Calendar className="mr-2 h-3 w-3" />
                            {exp.duration}
                          </Badge>
                        </div>
                        <p className="text-foreground font-bold text-sm tracking-tight">{exp.company}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed font-medium">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Insights and Suggestions */}
          <div className="grid gap-8 sm:grid-cols-2">
            <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden">
              <CardHeader className="bg-amber-50">
                <CardTitle className="text-lg font-headline flex items-center gap-2 text-amber-700">
                  <Zap className="h-5 w-5" />
                  Skill Gap Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                  {atsData?.skillGapAnalysis ?? "Your technical stack is strong, but you need more focus on cloud architecture patterns and observability tools to reach the top 1% of applicants."}
                </p>
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-amber-500/5 text-amber-800">
                    <AlertTriangle className="h-5 w-5 mt-0.5 shrink-0" />
                    <p className="text-xs font-bold">Focus on distributed systems keywords.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden">
              <CardHeader className="bg-emerald-50">
                <CardTitle className="text-lg font-headline flex items-center gap-2 text-emerald-700">
                  <Lightbulb className="h-5 w-5" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {(atsData?.suggestions.split('\n').filter(s => s.trim()).slice(0, 3) ?? [
                    "Strengthen your bullet points with concrete metrics.",
                    "Align your professional headline with the specific job title.",
                    "Remove outdated software versions to save space."
                  ]).map((suggestion, i) => (
                    <li key={i} className="flex gap-3 text-sm font-medium text-emerald-800">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                      {suggestion.replace(/^[*-]\s*/, '')}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-4 pt-10 pb-20">
        <Button size="lg" className="rounded-[1.5rem] h-16 px-12 text-xl font-black shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 group" onClick={() => router.push('/dashboard/jobs')}>
          Discover Matched Jobs 
          <Sparkles className="ml-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
        </Button>
        <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest">Powered by Gemini 2.5 Flash</p>
      </div>
    </div>
  );
}