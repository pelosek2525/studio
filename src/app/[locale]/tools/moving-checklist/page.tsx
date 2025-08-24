
import { MovingChecklist } from '@/components/tools/moving-checklist';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import checklistData from '@/../content/checklist.json';

export default function MovingChecklistPage() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="space-y-4 text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
          Checklist pro stěhování
        </h1>
        <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl">
          Váš interaktivní průvodce pro hladký start v Praze. Odškrtávejte si úkoly a sledujte svůj pokrok.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Váš osobní checklist</CardTitle>
          <CardDescription>Váš postup se automaticky ukládá v prohlížeči.</CardDescription>
        </CardHeader>
        <CardContent>
            <MovingChecklist checklistData={checklistData} />
        </CardContent>
      </Card>
    </div>
  );
}
