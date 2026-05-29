"use client"

import { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Briefcase, 
  MapPin, 
  Search, 
  Filter, 
  Bookmark, 
  ArrowRight,
  TrendingUp,
  Clock,
  ExternalLink,
  Target
} from 'lucide-react';
import { recommendJobs, JobRecommendationsOutput } from '@/ai/flows/job-recommendations-flow';

export default function JobRecommendations() {
  const [recommendations, setRecommendations] = useState<JobRecommendationsOutput['recommendations']>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchJobs() {
      const savedData = sessionStorage.getItem('resume_analysis');
      if (savedData) {
        try {
          // In a real app we'd pass the actual file URI, using a placeholder for demo
          // This flow expects a data URI. 
          const result = await recommendJobs({ 
            resumeDataUri: "data:application/pdf;base64,JVBERi0xLjQKJ..." 
          });
          setRecommendations(result.recommendations);
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  const filteredJobs = recommendations.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">Job Recommendations</h1>
          <p className="text-muted-foreground">Tailored opportunities based on your AI resume analysis.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by role or company..." 
              className="pl-10 h-11 rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="h-11 w-11 shrink-0 rounded-xl">
            <Filter className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 rounded-2xl bg-muted animate-pulse"></div>
          ))}
        </div>
      ) : filteredJobs.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job, i) => (
            <Card key={i} className="group border-none shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden bg-card">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors"></div>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-full">
                    <Bookmark className="h-5 w-5" />
                  </Button>
                </div>
                <div className="mt-4 space-y-1">
                  <h3 className="text-lg font-bold font-headline group-hover:text-primary transition-colors">{job.title}</h3>
                  <p className="text-primary font-semibold text-sm">{job.company}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pb-6">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5 bg-muted/50 px-2 py-1 rounded-md">
                    <MapPin className="h-3 w-3" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1.5 bg-muted/50 px-2 py-1 rounded-md">
                    <TrendingUp className="h-3 w-3" />
                    Full-time
                  </div>
                  <div className="flex items-center gap-1.5 bg-muted/50 px-2 py-1 rounded-md">
                    <Clock className="h-3 w-3" />
                    2d ago
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-muted-foreground uppercase tracking-widest">Match Strength</span>
                    <span className="font-bold text-primary">{job.matchPercentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-1000" 
                      style={{ width: `${job.matchPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {job.jobDescriptionSummary}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {job.skillsRequired.slice(0, 3).map((skill, si) => (
                      <Badge key={si} variant="outline" className="text-[10px] py-0 px-2 font-medium">
                        {skill}
                      </Badge>
                    ))}
                    {job.skillsRequired.length > 3 && (
                      <span className="text-[10px] text-muted-foreground font-medium pl-1">+{job.skillsRequired.length - 3} more</span>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button className="w-full rounded-xl h-11 font-bold">
                  Apply Now <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-20 text-center space-y-4 border-none shadow-sm">
          <Target className="h-16 w-16 text-muted-foreground mx-auto opacity-20" />
          <h3 className="text-2xl font-bold font-headline">No matches yet</h3>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Try uploading a different resume or adjusting your profile settings to get personalized job recommendations.
          </p>
          <Button asChild variant="outline" className="rounded-xl px-8 mt-4">
            <a href="/dashboard/upload">Analyze Another Resume</a>
          </Button>
        </Card>
      )}
    </div>
  );
}
