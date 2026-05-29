"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Upload, 
  FileText, 
  X, 
  CheckCircle2, 
  AlertCircle,
  FileUp,
  Loader2,
  Cpu,
  Target,
  Sparkles
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { parseResume } from '@/ai/flows/resume-parsing';
import { scoreResume } from '@/ai/flows/ats-scoring';
import { useToast } from '@/hooks/use-toast';

export default function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === 'application/pdf' || droppedFile.name.endsWith('.docx') || droppedFile.name.endsWith('.pdf'))) {
      setFile(droppedFile);
    } else {
      toast({
        variant: "destructive",
        title: "Invalid file format",
        description: "Please upload a PDF or DOCX file."
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const removeFile = () => setFile(null);

  const processResume = async () => {
    if (!file) return;
    
    setIsUploading(true);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          startAIProcessing();
          return 100;
        }
        return p + 5;
      });
    }, 100);
  };

  const startAIProcessing = async () => {
    setIsUploading(false);
    setIsProcessing(true);
    
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        try {
          // 1. Parse Resume
          const parsedResult = await parseResume({ resumeDataUri: base64 });
          
          // 2. If JD provided, run ATS scoring
          let atsResult = null;
          if (jobDescription.trim()) {
            // We use the summary and experience as text for the scorer
            const resumeContent = `${parsedResult.summary}\n\n${parsedResult.experience.map(e => `${e.title} at ${e.company}: ${e.description}`).join('\n')}\n\nSkills: ${parsedResult.skills.join(', ')}`;
            atsResult = await scoreResume({
              resumeText: resumeContent,
              jobDescriptionText: jobDescription
            });
          }

          sessionStorage.setItem('resume_analysis', JSON.stringify(parsedResult));
          if (atsResult) {
            sessionStorage.setItem('ats_analysis', JSON.stringify(atsResult));
          } else {
            sessionStorage.removeItem('ats_analysis');
          }

          toast({
            title: "Analysis complete",
            description: "Your resume has been successfully processed with AI."
          });
          router.push('/dashboard/analysis');
        } catch (error) {
          setIsProcessing(false);
          toast({
            variant: "destructive",
            title: "Processing failed",
            description: "An error occurred during AI analysis."
          });
        }
      };
      reader.readAsDataURL(file!);
    } catch (error) {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5" />
          Next-Gen AI Analysis
        </div>
        <h1 className="text-4xl font-extrabold font-headline tracking-tight text-foreground">
          Analyze Your <span className="text-primary italic">Career Potential</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Upload your resume and optionally paste a job description for a highly accurate ATS compatibility check.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-6">
          {!isUploading && !isProcessing ? (
            <Card className="border-2 border-dashed border-primary/30 bg-primary/5 hover:border-primary/60 transition-all cursor-pointer group rounded-3xl overflow-hidden">
              <CardContent 
                className="p-10 flex flex-col items-center justify-center space-y-6"
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
              >
                <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <Upload className="h-10 w-10 text-primary" />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-xl font-bold font-headline">Drop your resume here</p>
                  <p className="text-sm text-muted-foreground">PDF or DOCX (Max 10MB)</p>
                </div>
                
                <input 
                  type="file" 
                  id="file-upload" 
                  className="hidden" 
                  accept=".pdf,.docx"
                  onChange={handleFileChange} 
                />
                <Button asChild className="rounded-2xl px-8 h-12 shadow-lg shadow-primary/20">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Browse Local Files
                  </label>
                </Button>
              </CardContent>
            </Card>
          ) : isUploading ? (
            <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-card">
              <CardContent className="p-12 text-center space-y-8">
                <div className="space-y-4">
                  <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto animate-bounce">
                    <FileUp className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold font-headline">Uploading...</h3>
                  <p className="text-muted-foreground">Securely transferring your document.</p>
                </div>
                <div className="max-w-md mx-auto space-y-3">
                  <Progress value={progress} className="h-3 rounded-full" />
                  <p className="text-sm font-bold text-primary">{progress}% Complete</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-card">
              <CardContent className="p-12 text-center space-y-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-28 w-28 rounded-full border-[6px] border-primary/20 border-t-primary animate-spin"></div>
                  </div>
                  <div className="h-16 w-16 bg-primary rounded-2xl flex items-center justify-center mx-auto relative z-10 animate-pulse shadow-xl shadow-primary/30">
                    <Cpu className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold font-headline">AI Reasoning Engine...</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    Comparing your professional narrative against industry-standard semantics.
                  </p>
                </div>
                <div className="flex flex-col gap-4 max-w-xs mx-auto text-left">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" /> 
                    <span className="text-sm font-medium">Extracting metadata</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" /> 
                    <span className="text-sm font-medium">Analyzing skill hierarchy</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10">
                    <Loader2 className="h-5 w-5 text-primary animate-spin shrink-0" /> 
                    <span className="text-sm font-bold text-primary">Scoring compatibility</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {file && !isUploading && !isProcessing && (
            <div className="flex items-center justify-between p-5 bg-card rounded-2xl border-2 border-primary/10 shadow-lg group animate-in slide-in-from-left-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:rotate-6 transition-transform">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-sm truncate max-w-[200px]">{file.name}</p>
                  <p className="text-xs text-muted-foreground font-medium">{(file.size / 1024 / 1024).toFixed(2)} MB • Ready</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={removeFile} className="text-destructive hover:bg-destructive/10 rounded-full">
                <X className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card className="rounded-3xl border-none shadow-sm overflow-hidden">
            <CardHeader className="bg-muted/30">
              <CardTitle className="text-lg font-headline flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Target Job (Optional)
              </CardTitle>
              <CardDescription>
                Paste the job description to get a tailored ATS score.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="jd" className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Job Description Content</Label>
                  <Textarea 
                    id="jd" 
                    placeholder="Example: We are looking for a Senior Developer with 5+ years of experience in React..."
                    className="min-h-[220px] rounded-2xl bg-muted/30 border-none focus-visible:ring-primary/20 transition-all text-sm leading-relaxed"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    disabled={isUploading || isProcessing}
                  />
                </div>
                <Button 
                  className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98]" 
                  disabled={!file || isUploading || isProcessing}
                  onClick={processResume}
                >
                  Start Deep Analysis
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="p-6 rounded-3xl bg-accent/5 border border-accent/10 space-y-4">
            <h4 className="font-bold text-sm flex items-center gap-2 text-accent">
              <Sparkles className="h-4 w-4" />
              Why add a Job Description?
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Generic resumes rarely pass modern ATS. Our AI helps you find missing keywords specifically for the role you want.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}