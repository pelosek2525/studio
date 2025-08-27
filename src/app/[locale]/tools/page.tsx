
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Calculator, Sparkles, FileText, ListChecks, BookText, Timer, Building2 } from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';


export default async function ToolsPage() {
  const t = await getTranslations('ToolsPage');

  const tools = [
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: t('articleSummarizer.title'),
      description: t('articleSummarizer.description'),
      href: "/tools/article-summarizer",
      cta: t('articleSummarizer.cta')
    },
    {
      icon: <Timer className="h-8 w-8 text-primary" />,
      title: t('schengenCalculator.title'),
      description: t('schengenCalculator.description'),
      href: "/tools/schengen-calculator",
      cta: t('schengenCalculator.cta'),
      disabled: false
    },
    {
        icon: <Building2 className="h-8 w-8 text-primary" />,
        title: t('districtComparator.title'),
        description: t('districtComparator.description'),
        href: "/tools/district-comparator",
        cta: t('districtComparator.cta'),
        disabled: false
    },
    {
      icon: <Calculator className="h-8 w-8 text-primary" />,
      title: t('netSalaryCalculator.title'),
      description: t('netSalaryCalculator.description'),
      href: "/tools/net-salary-calculator",
      cta: t('netSalaryCalculator.cta'),
      disabled: false
    },
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: t('proofOfAccommodation.title'),
      description: t('proofOfAccommodation.description'),
      href: "/tools/proof-of-accommodation",
      cta: t('proofOfAccommodation.cta'),
      disabled: false
    },
    {
      icon: <ListChecks className="h-8 w-8 text-primary" />,
      title: t('movingChecklist.title'),
      description: t('movingChecklist.description'),
      href: "/tools/moving-checklist",
      cta: t('movingChecklist.cta'),
      disabled: false
    },
    {
      icon: <BookText className="h-8 w-8 text-primary" />,
      title: t('glossary.title'),
      description: t('glossary.description'),
      href: "/tools/glossary",
      cta: t('glossary.cta'),
      disabled: false
    }
  ];
  return (
    <div className="container max-w-4xl py-12">
      <div className="space-y-4 text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
          {t('title')}
        </h1>
        <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl">
          {t('description')}
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
