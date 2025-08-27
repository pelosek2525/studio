
import { SchengenCalculator } from '@/components/tools/schengen-calculator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getTranslations } from 'next-intl/server';

export default async function SchengenCalculatorPage() {
  const t = await getTranslations('SchengenCalculator');
  
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

      <Card>
        <CardHeader>
          <CardTitle>{t('cardTitle')}</CardTitle>
          <CardDescription>
            {t('cardDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
            <SchengenCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
