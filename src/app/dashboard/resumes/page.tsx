"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Search, 
  MoreVertical, 
  Download, 
  Eye, 
  Trash2, 
  Clock,
  ArrowRight,
  Plus
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import Link from 'next/link';

export default function ResumesHistory() {
  const [resumes, setResumes] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // For demo purposes, we'll try to get the current one from session
    const current = sessionStorage.getItem('resume_analysis');
    const ats = sessionStorage.getItem('ats_analysis');
    
    if (current) {
      const parsed = JSON.parse(current);
      const atsParsed = ats ? JSON.parse(ats) : null;
      setResumes([{
        id: 1,
        name: `${parsed.contactDetails.name}_Resume.pdf`,
        date: 'Today',
        score: atsParsed?.atsScore || 84,
        status: (atsParsed?.atsScore || 84) > 80 ? 'Optimal' : 'Needs Review'
      }]);
    }
  }, []);

  const filtered = resumes.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black font-headline tracking-tight">Optimization History</h1>
          <p className="text-muted-foreground">Access and manage your previous resume analysis sessions.</p>
        </div>
        <Link href="/dashboard/upload">
          <Button className="rounded-2xl h-12 px-6 font-bold shadow-lg shadow-primary/20">
            <Plus className="mr-2 h-5 w-5" /> New Analysis
          </Button>
        </Link>
      </div>

      <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden">
        <CardHeader className="border-b bg-muted/20 px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search history..." 
                className="pl-10 h-11 rounded-xl bg-background border-none shadow-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filtered.length > 0 ? (
            <div className="divide-y divide-border/50">
              {filtered.map((resume) => (
                <div key={resume.id} className="flex items-center justify-between p-6 hover:bg-muted/30 transition-colors group">
                  <div className="flex items-center gap-5">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:rotate-6 transition-transform">
                      <FileText className="h-7 w-7" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{resume.name}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-bold uppercase tracking-wider">
                          <Clock className="h-3 w-3" />
                          {resume.date}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-muted-foreground/30"></span>
                        <Badge variant="secondary" className="px-2 py-0 h-5 text-[10px] uppercase tracking-widest font-black">
                          {resume.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <div className="hidden sm:block text-right">
                      <p className="text-2xl font-black text-primary">{resume.score}%</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Match Score</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl" asChild>
                        <Link href="/dashboard/analysis">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 rounded-xl p-2">
                          <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer">
                            <Download className="h-4 w-4" /> Download Report
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer text-destructive focus:text-destructive">
                            <Trash2 className="h-4 w-4" /> Delete Analysis
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-4">
              <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mx-auto opacity-50">
                <FileText className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold">No history found</h3>
                <p className="text-muted-foreground">Try adjusting your search or start a new analysis.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}