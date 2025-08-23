import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Banknote } from 'lucide-react';

export default function MoneyPage() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="space-y-4 text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
          Managing Your Money
        </h1>
        <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl">
          Guides on cost of living, salaries, bank accounts, and mobile operators.
        </p>
      </div>
      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto bg-secondary rounded-full p-4 w-fit">
            <Banknote className="h-8 w-8 text-secondary-foreground" />
          </div>
          <CardTitle className="font-headline">Content Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">We're working hard on building out this section. Check back soon for detailed guides!</p>
        </CardContent>
      </Card>
    </div>
  );
}
