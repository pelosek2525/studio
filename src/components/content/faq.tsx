import type { FAQItem } from '@/lib/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { renderContent } from './glossary';

interface FaqProps {
  items: FAQItem[];
}

export function Faq({ items }: FaqProps) {
  return (
    <div className="my-8">
      <h2 className="font-headline text-2xl font-bold text-primary mb-6">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left font-semibold hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-foreground/80">
              {renderContent(item.answer)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
