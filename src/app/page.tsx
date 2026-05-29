import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import LandingNavbar from '@/components/landing/Navbar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { 
  CheckCircle2, 
  ArrowRight, 
  BarChart3, 
  Zap, 
  Search, 
  Star,
  Cpu
} from 'lucide-react';

export default function LandingPage() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-bg');
  
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-8 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                AI-Powered Career Intelligence
              </div>
              <h1 className="text-5xl font-extrabold font-headline leading-tight tracking-tight lg:text-7xl">
                Land Your <span className="text-primary italic">Dream Job</span> with AI Precision
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                ResuMatch AI analyzes your resume against millions of data points to optimize for ATS, 
                identify skill gaps, and match you with high-growth opportunities.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/auth/signup">
                  <Button size="lg" className="h-14 px-8 text-lg font-semibold rounded-xl">
                    Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-semibold rounded-xl">
                    How it works
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground pt-4">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  Free ATS Check
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  No Credit Card
                </div>
              </div>
            </div>
            
            <div className="relative lg:ml-10">
              <div className="glass absolute -inset-4 rounded-3xl -z-10 rotate-2 bg-primary/5"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border bg-card">
                <Image 
                  src={heroImg?.imageUrl || ''} 
                  alt="Dashboard Preview" 
                  width={600} 
                  height={400} 
                  className="w-full object-cover"
                  data-ai-hint="abstract network"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Successful Hires", value: "50K+" },
              { label: "Resumes Optimized", value: "1.2M" },
              { label: "Partner Companies", value: "450+" },
              { label: "Success Rate", value: "94%" },
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-2">
                <h3 className="text-4xl font-bold font-headline text-primary">{stat.value}</h3>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold font-headline lg:text-5xl">Everything you need to <span className="text-primary">win</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We've built a comprehensive suite of AI tools designed to get your resume through 
              automated scanners and into the hands of real hiring managers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart3,
                title: "ATS Optimization",
                desc: "Real-time scoring based on modern ATS algorithms used by top Fortune 500 companies."
              },
              {
                icon: Zap,
                title: "Skill Gap Analysis",
                desc: "Identify exactly which keywords and certifications you're missing for specific job roles."
              },
              {
                icon: Search,
                title: "Smart Matching",
                desc: "Our AI scouts the web to find job openings that match your skills and experience level."
              }
            ].map((feature, i) => (
              <div key={i} className="group p-8 rounded-2xl border bg-card hover:border-primary transition-all shadow-sm hover:shadow-xl">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold font-headline mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-headline lg:text-5xl">Voices of Success</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Sarah Chen",
                role: "Senior Software Engineer @ Google",
                text: "ResuMatch transformed my job search. After optimizing my resume here, my response rate tripled within weeks.",
                img: "user-1"
              },
              {
                name: "Marcus Thorne",
                role: "Product Manager @ Stripe",
                text: "The ATS score was eye-opening. I realized I was using the wrong terminology for my skills. Fixed it, got hired.",
                img: "user-2"
              }
            ].map((t, i) => (
              <div key={i} className="glass p-8 rounded-2xl space-y-6">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="italic text-lg text-foreground/80">"{t.text}"</p>
                <div className="flex items-center gap-4 border-t pt-6">
                  <Image 
                    src={PlaceHolderImages.find(img => img.id === t.img)?.imageUrl || ''} 
                    alt={t.name} 
                    width={48} 
                    height={48} 
                    className="rounded-full border-2 border-primary/20"
                  />
                  <div>
                    <h4 className="font-bold font-headline">{t.name}</h4>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <Cpu className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold font-headline text-primary">ResuMatch AI</span>
            </div>
            <div className="flex gap-8 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 ResuMatch AI. Built for better careers.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
