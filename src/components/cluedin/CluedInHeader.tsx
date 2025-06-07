import { Sparkles } from 'lucide-react';

export default function CluedInHeader() {
  return (
    <header className="py-8 text-center border-b border-border/60 mb-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-primary flex items-center justify-center">
          <Sparkles className="w-10 h-10 mr-3 text-accent animate-pulse" />
          CluedIn
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          See the Future First. Stay ahead with curated upcoming events and insights.
        </p>
      </div>
    </header>
  );
}
