"use client"

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Briefcase
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ResumeParsingOutput } from '@/ai/flows/resume-parsing';

export default function AnalysisResult() {
  const [data, setData] = useState<ResumeParsingOutput | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedData = sessionStorage.getItem('resume_analysis');
    if (savedData) {
      setData(JSON.parse(savedData));
    } else {
      router.push('/dashboard/upload');
    }
  }, [router]);

  if (!data) return null;

  const atsScore = 84; // Mock score for UI
  const scoreData = [
    { name: 'Score', value: atsScore },
    { name: 'Remaining', value: 100 - atsScore },
  ];
  const COLORS = ['#3B58E6', '#F1F5F9'];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push('/dashboard')} className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold font-headline">{data.contactDetails.name}</h1>
            <p className="text-muted-foreground">Analysis for {data.summary?.slice(0, 30)}...</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="rounded-xl">
            <Download className="mr-2 h-4 w-4" /> Download Report
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl">
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Score Card */}
        <Card className="lg:col-span-1 border-none shadow-sm relative overflow-hidden bg-primary text-primary-foreground">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
          <CardHeader>
            <CardTitle className="text-xl font-headline">ATS Compatibility</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-2 pb-8 space-y-6">
            <div className="relative h-48 w-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={scoreData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={85}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    stroke="none"
                  >
                    <Cell key="cell-0" fill="#FFFFFF" />
                    <Cell key="cell-1" fill="rgba(255,255,255,0.2)" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold font-headline">{atsScore}</span>
                <span className="text-xs font-medium uppercase tracking-widest opacity-80">Out of 100</span>
              </div>
            </div>
            <div className="text-center">
              <Badge variant="secondary" className="bg-white text-primary font-bold px-4 py-1 text-sm rounded-lg mb-4">Strong Match</Badge>
              <p className="text-sm opacity-90 px-4">Your resume is highly optimized for current industry standards and AI screening bots.</p>
            </div>
          </CardContent>
        </Card>

        {/* Contact & Bio */}
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-headline">Professional Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-lg">
                <Mail className="h-4 w-4 text-primary" />
                <span>{data.contactDetails.email}</span>
              </div>
              {data.contactDetails.phone && (
                <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-lg">
                  <Briefcase className="h-4 w-4 text-primary" />
                  <span>{data.contactDetails.phone}</span>
                </div>
              )}
              {data.contactDetails.linkedin && (
                <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-lg">
                  <Linkedin className="h-4 w-4 text-primary" />
                  <a href={data.contactDetails.linkedin} target="_blank" className="hover:underline text-primary">LinkedIn</a>
                </div>
              )}
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Expertise Summary</h4>
              <p className="text-foreground leading-relaxed">
                {data.summary || "Highly skilled professional with expertise in technical implementations and strategic planning."}
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Detected Skills</h4>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, i) => (
                  <Badge key={i} variant="secondary" className="px-3 py-1 bg-primary/10 text-primary border-none text-xs font-semibold">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Experience Timeline */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-headline flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Experience Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative border-l-2 border-primary/20 ml-3 pl-8 space-y-10 py-2">
              {data.experience.map((exp, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[42px] top-1 h-5 w-5 rounded-full border-4 border-primary bg-background"></div>
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="font-bold font-headline text-lg">{exp.title}</h4>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                        <Calendar className="h-3 w-3" />
                        {exp.duration}
                      </div>
                    </div>
                    <p className="text-primary font-semibold text-sm">{exp.company}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Improvements & Insights */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-headline flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Improvement Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 p-4 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100">
                <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-sm">Quantifiable Achievements</p>
                  <p className="text-xs opacity-90 mt-1">Excellent use of metrics (e.g., "30% increase") in your bullet points.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-xl bg-amber-50 text-amber-700 border border-amber-100">
                <AlertTriangle className="h-5 w-5 mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-sm">Missing Action Verbs</p>
                  <p className="text-xs opacity-90 mt-1">Try starting your bullet points with "Spearheaded", "Architected", or "Optimized".</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-xl bg-blue-50 text-blue-700 border border-blue-100">
                <Briefcase className="h-5 w-5 mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-sm">Keyword Optimization</p>
                  <p className="text-xs opacity-90 mt-1">Consider adding "Agile Methodologies" as it's highly requested for your roles.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-headline">Education</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {data.education.map((edu, i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <Award className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm">{edu.degree}</h4>
                    <p className="text-xs text-primary font-medium">{edu.institution}</p>
                    <p className="text-xs text-muted-foreground">{edu.duration}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="flex justify-center pt-8 pb-12">
        <Button size="lg" className="rounded-xl h-14 px-12 text-lg font-bold shadow-xl shadow-primary/20" onClick={() => router.push('/dashboard/jobs')}>
          View Matched Jobs <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
        </Button>
      </div>
    </div>
  );
}
