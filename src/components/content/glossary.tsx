'use client';

import React, { createContext, useContext, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Currency } from './currency';
import type { Glossary, GlossaryEntry } from '@/lib/types';


// --- CONTEXT ---
interface GlossaryContextType {
  openGlossary: (termId: string) => void;
}

const GlossaryContext = createContext<GlossaryContextType | null>(null);

export const useGlossary = () => {
  const context = useContext(GlossaryContext);
  if (!context) {
    throw new Error('useGlossary must be used within a GlossaryWrapper');
  }
  return context;
};

export const GlossaryWrapper = ({ children }: { children: React.ReactNode }) => {
  const [activeTermId, setActiveTermId] = useState<string | null>(null);

  const openGlossary = (termId: string) => {
    setActiveTermId(termId);
  };

  const closeGlossary = () => {
    setActiveTermId(null);
  }

  const contextValue = {
    openGlossary,
    activeTermId,
    closeGlossary
  };

  return (
    <GlossaryContext.Provider value={contextValue as any}>
      {children}
    </GlossaryContext.Provider>
  );
};


// --- RENDERER ---
export const renderContent = (content: string) => {
  const parts = content.split(/({glossary:[a-zA-Z0-9_-]+})|({currency:\d+:[A-Z]{3}})/g).filter(Boolean);

  return parts.map((part, index) => {
    const glossaryMatch = part.match(/{glossary:([a-zA-Z0-9_-]+)}/);
    if (glossaryMatch) {
      const termId = glossaryMatch[1];
      return <GlossaryTerm key={`${termId}-${index}`} termId={termId} />;
    }
    
    const currencyMatch = part.match(/{currency:(\d+):([A-Z]{3})}/);
    if (currencyMatch) {
        const [, amount, currency] = currencyMatch;
        return <Currency key={`${amount}-${index}`} amount={Number(amount)} currency={currency} />;
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
};


// --- TERM ---
interface GlossaryTermProps {
  termId: string;
}

function GlossaryTerm({ termId }: GlossaryTermProps) {
  const { openGlossary } = useGlossary();
  // Get the display text from the original content, which is the part after the colon
  const displayTerm = termId;

  return (
    <Button
      variant="link"
      className="p-0 h-auto text-base text-accent border-b border-accent border-dashed rounded-none"
      onClick={() => openGlossary(termId)}
    >
      {displayTerm}
    </Button>
  );
}


// --- DIALOG ---
interface GlossaryDialogProps {
  glossary: Glossary;
}

export function GlossaryDialog({ glossary }: GlossaryDialogProps) {
  const { activeTermId, closeGlossary } = useContext(GlossaryContext) as any;
  const entry = activeTermId ? glossary[activeTermId] : null;

  return (
    <Dialog open={!!activeTermId} onOpenChange={(isOpen) => !isOpen && closeGlossary()}>
      <DialogContent>
        {entry && (
          <>
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl">{entry.term}</DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-foreground/80 text-base">
              {entry.definition}
            </DialogDescription>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
