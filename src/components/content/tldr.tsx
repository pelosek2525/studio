import { ListChecks } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TldrProps {
  items: string[];
}

export function Tldr({ items }: TldrProps) {
  return (
    <Card className="bg-primary/5 border-primary/20 my-8 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 font-headline text-primary">
          <ListChecks className="h-6 w-6" />
          TL;DR
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 list-disc pl-5 text-foreground/90">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
