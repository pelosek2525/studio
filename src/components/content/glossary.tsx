
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
import type { Glossary } from '@/lib/types';


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

// --- TERM ---
interface GlossaryTermProps {
  termId: string;
  children: React.ReactNode;
}

export function GlossaryTerm({ termId, children }: GlossaryTermProps) {
  const { openGlossary } = useGlossary();
  
  return (
    <Button
      variant="link"
      className="p-0 h-auto text-base align-baseline text-accent border-b border-accent border-dashed rounded-none"
      onClick={() => openGlossary(termId)}
    >
      {children}
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
            <DialogDescription
              className="text-foreground/80 text-base"
              dangerouslySetInnerHTML={{ __html: entry.definition }}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
