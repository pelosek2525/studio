import { Metadata } from 'next';
import { Calendar, Clock } from 'lucide-react';
import { registrationGuide, glossary } from '@/lib/data';
import { Tldr } from '@/components/content/tldr';
import { Callout } from '@/components/content/callout';
import { StepList } from '@/components/content/step-list';
import { Faq } from '@/components/content/faq';
import { Separator } from '@/components/ui/separator';
import { renderContent, GlossaryDialog, GlossaryWrapper } from '@/components/content/glossary';


export const metadata: Metadata = {
  title: `${registrationGuide.title} | CityZen Guide`,
  description: registrationGuide.excerpt,
};

export default function Page() {
  const { title, updatedAt, readingTime, tldr, callout, steps, faq } = registrationGuide;

  return (
    <GlossaryWrapper>
      <div className="container max-w-4xl py-12">
        <article>
          <header className="mb-8">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
              {title}
            </h1>
            <div className="mt-4 flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Last updated on {updatedAt}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </header>
          
          <Tldr items={tldr} />
          
          {callout && <Callout type={callout.type}>{callout.text}</Callout>}
          
          <Separator className="my-12" />
          
          <StepList steps={steps} />
          
          <Separator className="my-12" />
          
          <Faq items={faq} />
          
        </article>
      </div>
      <GlossaryDialog glossary={glossary} />
    </GlossaryWrapper>
  );
}
