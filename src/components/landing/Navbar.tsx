import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Cpu } from 'lucide-react';

export default function LandingNavbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Cpu className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold font-headline tracking-tight text-primary">ResuMatch AI</span>
        </div>
        
        <div className="hidden items-center gap-8 md:flex">
          <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
          <Link href="#stats" className="text-sm font-medium hover:text-primary transition-colors">Statistics</Link>
          <Link href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">Success Stories</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/auth/login">
            <Button variant="ghost" className="hidden sm:inline-flex">Login</Button>
          </Link>
          <Link href="/auth/signup">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
