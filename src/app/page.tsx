
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
  Cpu,
  ShieldCheck,
  Rocket,
  LineChart
} from 'lucide-react';

export default function LandingPage() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-dashboard');
  const atsImg = PlaceHolderImages.find(img => img.id === 'feature-ats');
  const matchImg = PlaceHolderImages.find(img => img.id === 'feature-matching');
  
  return (
    <div className="min-h-screen bg-background selection:bg-primary/10">
      <LandingNavbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-20 lg:pt-32 lg:pb-40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary/5 via-transparent to-transparent -z-10" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="flex flex-col items-center text-center space-y-10 max-w-4xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-widest animate-in fade-in slide-in-from-top-4 duration-1000">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              AI-Powered Career Intelligence v2.0
            </div>
            
            <h1 className="text-6xl font-black font-headline leading-[1.1] tracking-tighter lg:text-8xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              Build a Resume That <br/>
              <span className="text-gradient italic">Actually Gets Hired.</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              Stop guessing what recruiters want. Our AI analyzes your experience against real-world hiring patterns to maximize your ATS performance and job matching.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
              <Link href="/auth/signup">
                <Button size="lg" className="h-16 px-10 text-xl font-black rounded-2xl shadow-2xl shadow-primary/30 hover:scale-105 transition-all">
                  Get Started Free <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg" className="h-16 px-10 text-xl font-bold rounded-2xl border-2">
                  View Demo
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 text-sm font-bold text-muted-foreground pt-4 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                Privacy First
              </div>
              <div className="flex items-center gap-2">
                <Rocket className="h-5 w-5 text-primary" />
                Instant Results
              </div>
            </div>
          </div>
          
          <div className="relative max-w-6xl mx-auto animate-float">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 via-accent/20 to-primary/20 rounded-[3rem] blur-3xl -z-10 opacity-50"></div>
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-card">
              {heroImg?.imageUrl && (
                <Image 
                  src={heroImg.imageUrl} 
                  alt="ResuMatch Dashboard" 
                  width={1200} 
                  height={800} 
                  className="w-full object-cover"
                  priority
                  data-ai-hint="dashboard software"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-white/50 border-y">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs font-black text-muted-foreground uppercase tracking-[0.3em] mb-12">Trusted by professionals at</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale contrast-125">
            <span className="text-3xl font-black font-headline">GOOGLE</span>
            <span className="text-3xl font-black font-headline">META</span>
            <span className="text-3xl font-black font-headline">APPLE</span>
            <span className="text-3xl font-black font-headline">NETFLIX</span>
            <span className="text-3xl font-black font-headline">STRIPE</span>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="features" className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-black font-headline">Smarter analysis, <br/><span className="text-primary">faster results.</span></h2>
                <p className="text-lg text-muted-foreground">We've automated the most tedious parts of the job search so you can focus on interviewing.</p>
              </div>

              <div className="space-y-8">
                {[
                  {
                    icon: BarChart3,
                    title: "Precision ATS Scoring",
                    desc: "Our engine uses the same logic as Greenhouse and Workday to score your resume."
                  },
                  {
                    icon: Zap,
                    title: "Automated Skill Gap Analysis",
                    desc: "Instantly find out which 3-5 keywords are holding you back from a 90%+ match score."
                  },
                  {
                    icon: LineChart,
                    title: "Market Benchmarking",
                    desc: "See how your experience compares to other candidates applying for similar roles."
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="flex-shrink-0 h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <item.icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                   <div className="rounded-3xl overflow-hidden border-4 border-white shadow-xl">
                    {atsImg?.imageUrl && (
                      <Image 
                        src={atsImg.imageUrl} 
                        alt="ATS Scan" 
                        width={400} 
                        height={300} 
                        className="w-full object-cover aspect-square"
                        data-ai-hint="data analysis"
                      />
                    )}
                   </div>
                   <div className="bg-primary p-8 rounded-3xl text-white shadow-xl">
                      <h4 className="text-2xl font-black mb-2">94%</h4>
                      <p className="text-sm font-medium opacity-80 uppercase tracking-widest">Success Rate</p>
                   </div>
                </div>
                <div className="space-y-4">
                   <div className="bg-accent p-8 rounded-3xl text-white shadow-xl">
                      <Zap className="h-10 w-10 mb-4" />
                      <p className="text-lg font-bold">1.2M+ Resumes Processed</p>
                   </div>
                   <div className="rounded-3xl overflow-hidden border-4 border-white shadow-xl">
                    {matchImg?.imageUrl && (
                      <Image 
                        src={matchImg.imageUrl} 
                        alt="Job Matching" 
                        width={400} 
                        height={300} 
                        className="w-full object-cover aspect-square"
                        data-ai-hint="business networking"
                      />
                    )}
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-[3rem] p-12 lg:p-24 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full -ml-48 -mb-48 blur-3xl"></div>
            
            <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
              <h2 className="text-4xl lg:text-6xl font-black font-headline">Ready to beat the bots?</h2>
              <p className="text-xl opacity-80 font-medium">Join 50,000+ professionals who have already optimized their career trajectory with ResuMatch AI.</p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link href="/auth/signup">
                  <Button size="lg" variant="secondary" className="h-16 px-12 text-xl font-black rounded-2xl bg-white text-primary hover:bg-white/90">
                    Get Started Now
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button size="lg" variant="outline" className="h-16 px-12 text-xl font-bold rounded-2xl border-white/30 text-white hover:bg-white/10">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Cpu className="h-8 w-8 text-primary" />
                <span className="text-2xl font-black font-headline text-primary">ResuMatch AI</span>
              </div>
              <p className="text-muted-foreground font-medium">The world's most advanced AI-driven resume optimization and career scouting platform.</p>
            </div>
            
            <div>
              <h4 className="font-black text-sm uppercase tracking-widest mb-6">Product</h4>
              <ul className="space-y-4 text-sm font-medium text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">ATS Checker</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Skill Gap AI</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Job Matching</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-sm uppercase tracking-widest mb-6">Company</h4>
              <ul className="space-y-4 text-sm font-medium text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Success Stories</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-sm uppercase tracking-widest mb-6">Connect</h4>
              <ul className="space-y-4 text-sm font-medium text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">Twitter (X)</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">LinkedIn</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Support</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Email Us</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
            <p>© 2024 ResuMatch AI Corp. All rights reserved.</p>
            <div className="flex gap-8">
              <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
              <Link href="#" className="hover:text-primary transition-colors">Security</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
