'use client';

import type { Step } from '@/lib/types';
import { renderContent } from './glossary';

interface StepListProps {
  steps: Step[];
}

export function StepList({ steps }: StepListProps) {
  return (
    <div className="my-8">
      <h2 className="font-headline text-2xl font-bold text-primary mb-6">Steps to Follow</h2>
      <ol className="relative border-l border-primary/20 ml-4">
        {steps.map((step, index) => (
          <li key={index} className="mb-10 ml-8">
            <span className="absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground ring-8 ring-background">
              {index + 1}
            </span>
            <h3 className="flex items-center mb-1 text-lg font-semibold text-foreground font-headline">
              {step.title}
            </h3>
            <p className="mb-4 text-base font-normal text-foreground/80">{renderContent(step.details)}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
