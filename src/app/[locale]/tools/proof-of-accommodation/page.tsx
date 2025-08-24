
'use client';

import { ProofOfAccommodationForm } from '@/components/tools/proof-of-accommodation-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProofOfAccommodationPage() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="space-y-4 text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
          Doklad o zajištění ubytování
        </h1>
        <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl">
          Vyplňte formulář níže a vygenerujte si hotový dokument k tisku.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generátor dokladu</CardTitle>
          <CardDescription>Všechny údaje jsou zpracovávány pouze ve vašem prohlížeči a nikam se neukládají.</CardDescription>
        </CardHeader>
        <CardContent>
            <ProofOfAccommodationForm />
        </CardContent>
      </Card>
    </div>
  );
}
