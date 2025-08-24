
import { NetSalaryCalculator } from '@/components/tools/net-salary-calculator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function NetSalaryCalculatorPage() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="space-y-4 text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
          Výpočet čisté mzdy 2025
        </h1>
        <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl">
          Spočítejte si svou čistou mzdu v České republice.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Kalkulačka čisté mzdy</CardTitle>
          <CardDescription>Zadejte svou hrubou měsíční mzdu a zjistěte, kolik si skutečně vyděláte.</CardDescription>
        </CardHeader>
        <CardContent>
            <NetSalaryCalculator />
        </CardContent>
      </Card>
    </div>
  );
}
