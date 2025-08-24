'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface CalculationResult {
  grossSalary: number;
  healthInsurance: number;
  socialInsurance: number;
  taxableIncome: number;
  incomeTax: number;
  taxDiscount: number;
  finalTax: number;
  netSalary: number;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
};
  

export function NetSalaryCalculator() {
  const [grossSalary, setGrossSalary] = useState<string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateNetSalary = () => {
    const salary = parseFloat(grossSalary);
    if (isNaN(salary) || salary < 0) {
      setError('Zadejte prosím platnou částku hrubé mzdy.');
      setResult(null);
      return;
    }
    setError(null);

    // Calculation Constants for 2025 (as per user request, using current known rates for demonstration)
    const HEALTH_INSURANCE_RATE = 0.045;
    const SOCIAL_INSURANCE_RATE = 0.071; // New rate from 2024
    const TAX_RATE_LOW = 0.15;
    const TAX_RATE_HIGH = 0.23;
    const TAX_BRACKET_LIMIT = 131901; // For 2024, this is 3x average salary. Placeholder.
    const BASIC_TAX_DISCOUNT = 2570; // 30840 / 12

    const healthInsurance = salary * HEALTH_INSURANCE_RATE;
    const socialInsurance = salary * SOCIAL_INSURANCE_RATE;

    const taxableIncome = salary;
    
    let incomeTax;
    // Note: The concept of `superhrubá mzda` was abolished in 2021.
    // The tax is now calculated from the gross salary.
    if (taxableIncome <= TAX_BRACKET_LIMIT) {
      incomeTax = taxableIncome * TAX_RATE_LOW;
    } else {
      incomeTax = (TAX_BRACKET_LIMIT * TAX_RATE_LOW) + ((taxableIncome - TAX_BRACKET_LIMIT) * TAX_RATE_HIGH);
    }
    
    const finalTax = Math.max(0, incomeTax - BASIC_TAX_DISCOUNT);
    const netSalary = salary - healthInsurance - socialInsurance - finalTax;

    setResult({
      grossSalary: salary,
      healthInsurance,
      socialInsurance,
      taxableIncome,
      incomeTax,
      taxDiscount: BASIC_TAX_DISCOUNT,
      finalTax,
      netSalary,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid w-full max-w-sm items-center gap-2">
        <Label htmlFor="gross-salary">Hrubá měsíční mzda (Kč)</Label>
        <div className="flex space-x-2">
            <Input
                type="number"
                id="gross-salary"
                value={grossSalary}
                onChange={(e) => setGrossSalary(e.target.value)}
                placeholder="např. 50000"
                className="text-base"
            />
            <Button onClick={calculateNetSalary}>Spočítat</Button>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      {result && (
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Výsledky</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-lg">
                <div className="flex justify-between items-center">
                    <span className="font-bold text-primary">Čistá mzda</span>
                    <span className="font-bold text-primary text-2xl">{formatCurrency(result.netSalary)}</span>
                </div>
                 <hr className="my-2 border-border" />
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Hrubá mzda</span>
                    <span>{formatCurrency(result.grossSalary)}</span>
                </div>
                <div className="flex justify-between text-sm text-red-500">
                    <span >- Sociální pojištění (7,1 %)</span>
                    <span>{formatCurrency(result.socialInsurance)}</span>
                </div>
                <div className="flex justify-between text-sm text-red-500">
                    <span >- Zdravotní pojištění (4,5 %)</span>
                    <span>{formatCurrency(result.healthInsurance)}</span>
                </div>
                 <div className="flex justify-between text-sm text-red-500">
                    <span >- Daň z příjmu (po slevě)</span>
                    <span >{formatCurrency(result.finalTax)}</span>
                </div>
                 <hr className="my-2 border-border" />
                <div className="flex justify-between text-sm text-muted-foreground">
                    <span className='italic'>Sleva na poplatníka</span>
                    <span className='italic'>-{formatCurrency(result.taxDiscount)}</span>
                </div>

            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
