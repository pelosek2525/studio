import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollText } from 'lucide-react';

export default function HowToPage() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="space-y-4 text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
          How-To Guides
        </h1>
        <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl">
          Practical step-by-step instructions for everyday tasks.
        </p>
      </div>
      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto bg-secondary rounded-full p-4 w-fit">
            <ScrollText className="h-8 w-8 text-secondary-foreground" />
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
