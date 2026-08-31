import { ArrowLeft, Compass } from 'lucide-react';
import { Link } from 'wouter';
import { PublicLayout } from '@/layouts/PublicLayout';

export default function NotFound() {
  return <PublicLayout><main className="mx-auto flex min-h-[65vh] max-w-xl flex-col items-center justify-center px-5 text-center"><div className="grid h-14 w-14 place-items-center rounded-2xl bg-[hsl(var(--accent))]"><Compass size={28} /></div><p className="mt-7 text-xs font-bold uppercase tracking-[.16em] text-[hsl(var(--primary))]">A wrong turn</p><h1 className="mt-3 font-display text-5xl font-extrabold tracking-[-.06em]">This page is not covered.</h1><p className="mt-4 text-[hsl(var(--muted-foreground))]">The page you are looking for does not exist in this demo.</p><Link href="/" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[hsl(var(--primary))] px-4 py-3 text-sm font-bold text-white" data-testid="link-not-found-home"><ArrowLeft size={15} /> Back home</Link></main></PublicLayout>;
}
