
'use client';

import Link from 'next/link';
import type { TocEntry, GuideMetadata } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useHeadsObserver } from '@/hooks/use-heads-observer';
import { ArrowRight } from 'lucide-react';

interface GuideSidebarProps {
  toc: TocEntry[];
  relatedGuides: GuideMetadata[];
}

export function GuideSidebar({ toc, relatedGuides }: GuideSidebarProps) {
  const {activeId} = useHeadsObserver();
  
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-20 space-y-8">
        {toc.length > 0 && (
          <div>
            <h3 className="font-headline text-lg font-semibold text-primary mb-4">On this page</h3>
            <ul className="space-y-2">
              {toc.map((entry) => (
                <li key={entry.id}>
                  <a
                    href={`#${entry.id}`}
                    className={cn(
                      'block transition-colors duration-200 hover:text-accent',
                      entry.level === 3 && 'pl-4',
                      activeId === entry.id ? 'text-accent font-semibold' : 'text-muted-foreground'
                    )}
                  >
                    {entry.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        {relatedGuides.length > 0 && (
            <div>
                 <h3 className="font-headline text-lg font-semibold text-primary mb-4">Related guides</h3>
                 <ul className="space-y-3">
                    {relatedGuides.map((guide) => (
                        <li key={guide.slug}>
                            <Link href={`/guides/${guide.category}/${guide.slug}`} className="text-accent hover:text-accent/80 transition-colors duration-300 flex items-center justify-between group">
                                <span>- {guide.title}</span>
                                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        </li>
                    ))}
                 </ul>
            </div>
        )}
      </div>
    </aside>
  );
}
