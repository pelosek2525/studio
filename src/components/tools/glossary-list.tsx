
'use client';

import { useState } from 'react';
import type { GlossaryEntry } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface GlossaryListProps {
  glossary: GlossaryEntry[];
}

export function GlossaryList({ glossary }: GlossaryListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGlossary = glossary.filter(
    (entry) =>
      entry.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Hledat termín nebo definici..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {filteredGlossary.length > 0 ? (
        <Accordion type="single" collapsible className="w-full">
          {filteredGlossary.map((entry) => (
            <AccordionItem value={entry.term} key={entry.term}>
              <AccordionTrigger className="font-headline text-lg text-left">{entry.term}</AccordionTrigger>
              <AccordionContent>
                <div
                    className="prose prose-lg dark:prose-invert max-w-none text-foreground/90"
                    dangerouslySetInnerHTML={{ __html: entry.definition }}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <p className="text-center text-muted-foreground py-8">
          Nebyly nalezeny žádné odpovídající termíny.
        </p>
      )}
    </div>
  );
}
