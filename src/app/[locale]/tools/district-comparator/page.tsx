
import { DistrictComparator } from '@/components/tools/district-comparator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import districtData from '@/../content/districts.json';

export default function DistrictComparatorPage() {
  return (
    <div className="container max-w-7xl py-12">
      <div className="space-y-4 text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
          Srovnávač pražských čtvrtí
        </h1>
        <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl">
            Vyberte si až tři čtvrti a porovnejte je na základě klíčových kritérií, abyste našli ideální místo pro život.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Porovnat čtvrti</CardTitle>
          <CardDescription>Přidejte nebo odeberte čtvrti a podívejte se na jejich hodnocení.</CardDescription>
        </CardHeader>
        <CardContent>
            <DistrictComparator districts={districtData.districts} />
        </CardContent>
      </Card>
    </div>
  );
}
