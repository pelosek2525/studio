
import { getGlossary } from '@/lib/guides';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GlossaryList } from '@/components/tools/glossary-list';

export default function GlossaryToolPage() {
  const glossary = getGlossary();
  const sortedGlossary = Object.values(glossary).sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="container max-w-4xl py-12">
      <div className="space-y-4 text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
          Slovníček pojmů
        </h1>
        <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl">
          Prohledávejte a objevujte klíčové termíny a zkratky související se životem v České republice.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Prohledat slovníček</CardTitle>
          <CardDescription>Začněte psát pro okamžité filtrování termínů.</CardDescription>
        </CardHeader>
        <CardContent>
          <GlossaryList glossary={sortedGlossary} />
        </CardContent>
      </Card>
    </div>
  );
}
