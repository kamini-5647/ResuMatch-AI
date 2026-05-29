"use client"

import { useState, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  X, 
  CheckCircle2, 
  AlertCircle,
  FileUp,
  Loader2,
  Cpu
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { parseResume } from '@/ai/flows/resume-parsing';
import { useToast } from '@/hooks/use-toast';

export default function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === 'application/pdf' || droppedFile.name.endsWith('.docx'))) {
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
    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          startAIProcessing();
          return 100;
        }
        return p + 10;
      });
    }, 200);
  };

  const startAIProcessing = async () => {
    setIsUploading(false);
    setIsProcessing(true);
    
    try {
      // Convert file to Base64 for GenAI
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        try {
          // Trigger the AI flow
          const result = await parseResume({ resumeDataUri: base64 });
          // Store result in session storage for the results page (simplified for demo)
          sessionStorage.setItem('resume_analysis', JSON.stringify(result));
          toast({
            title: "Analysis complete",
            description: "Your resume has been successfully parsed."
          });
          router.push('/dashboard/analysis');
        } catch (error) {
          setIsProcessing(false);
          toast({
            variant: "destructive",
            title: "Processing failed",
            description: "An error occurred while analyzing your resume."
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
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold font-headline">Analyze New Resume</h1>
        <p className="text-muted-foreground">Upload your resume to get an instant AI-powered compatibility score.</p>
      </div>

      {!isUploading && !isProcessing ? (
        <Card className="border-2 border-dashed border-primary/20 bg-primary/5 hover:border-primary/50 transition-colors cursor-pointer">
          <CardContent 
            className="p-12 flex flex-col items-center justify-center space-y-6"
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
          >
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="h-10 w-10 text-primary" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-xl font-semibold">Drag and drop your file here</p>
              <p className="text-sm text-muted-foreground">Supported formats: PDF, DOCX (Max 10MB)</p>
            </div>
            
            <input 
              type="file" 
              id="file-upload" 
              className="hidden" 
              accept=".pdf,.docx"
              onChange={handleFileChange} 
            />
            <Button asChild className="rounded-xl px-8 h-12">
              <label htmlFor="file-upload" className="cursor-pointer">
                Browse Files
              </label>
            </Button>
          </CardContent>
        </Card>
      ) : isUploading ? (
        <Card className="border-none shadow-sm">
          <CardContent className="p-12 text-center space-y-8">
            <div className="space-y-4">
              <FileUp className="h-12 w-12 text-primary mx-auto animate-bounce" />
              <h3 className="text-xl font-bold font-headline">Uploading Resume...</h3>
              <p className="text-muted-foreground">Securing your file transfer.</p>
            </div>
            <div className="max-w-md mx-auto space-y-2">
              <Progress value={progress} className="h-3" />
              <p className="text-sm font-medium text-right text-primary">{progress}%</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-none shadow-sm">
          <CardContent className="p-12 text-center space-y-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-24 w-24 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
              </div>
              <Cpu className="h-12 w-12 text-primary mx-auto relative z-10 animate-pulse" />
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-headline">AI Analyzing Content...</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Extracting skills, experience, and calculating ATS compatibility using advanced semantic models.
              </p>
            </div>
            <div className="flex flex-col gap-3 max-w-xs mx-auto text-left text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" /> 
                Reading semantic structure
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" /> 
                Extracting technical skills
              </div>
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 text-primary animate-spin" /> 
                Calculating compatibility score
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {file && !isUploading && !isProcessing && (
        <div className="space-y-4">
          <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Selected File</h3>
          <div className="flex items-center justify-between p-4 bg-card rounded-xl border shadow-sm group">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-sm">{file.name}</p>
                <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={removeFile} className="text-destructive hover:bg-destructive/10">
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <Button className="w-full h-14 rounded-xl text-lg font-bold" onClick={processResume}>
            Start Analysis
          </Button>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6 pt-12">
        <div className="flex gap-4">
          <div className="h-10 w-10 shrink-0 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm">Secure Processing</h4>
            <p className="text-xs text-muted-foreground">Your data is encrypted and never shared with third parties.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="h-10 w-10 shrink-0 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <Cpu className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm">Deep Context AI</h4>
            <p className="text-xs text-muted-foreground">We understand the meaning behind your bullet points.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="h-10 w-10 shrink-0 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
            <AlertCircle className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm">Actionable Feedback</h4>
            <p className="text-xs text-muted-foreground">Not just a score, but a clear roadmap to improvement.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
