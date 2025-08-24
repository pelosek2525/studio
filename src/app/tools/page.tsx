
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Calculator, Sparkles, FileText } from 'lucide-react';
import Link from 'next/link';

const tools = [
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: "AI Article Summarizer",
    description: "Get a quick TL;DR for any article or guide. Saves you time and effort.",
    href: "/tools/article-summarizer",
    cta: "Use Summarizer"
  },
  {
    icon: <Calculator className="h-8 w-8 text-primary" />,
    title: "Výpočet čisté mzdy",
    description: "Spočítejte si svou čistou mzdu v České republice.",
    href: "/tools/net-salary-calculator",
    cta: "Otevřít kalkulačku",
    disabled: false
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: "Potvrzení o zajištění ubytování",
    description: "Vyplňte a vytiskněte si doklad o zajištění ubytování.",
    href: "/tools/proof-of-accommodation",
    cta: "Vyplnit doklad",
    disabled: false
  }
];

export default function ToolsPage() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="space-y-4 text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
          Tools & Calculators
        </h1>
        <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl">
          Our collection of interactive tools to make your city life easier.
        </p>
      </div>
      <div className="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2">
        {tools.map((tool) => (
          <Card key={tool.title} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                {tool.icon}
                <CardTitle className="font-headline">{tool.title}</CardTitle>
              </div>
              <CardDescription className="pt-2">{tool.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow" />
            <div className="p-6 pt-0">
              <Button asChild className="w-full" disabled={tool.disabled}>
                <Link href={tool.href}>
                  {tool.cta} {!tool.disabled && <ArrowRight className="ml-2 h-4 w-4" />}
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
