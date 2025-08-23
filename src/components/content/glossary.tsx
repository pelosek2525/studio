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
import type { Glossary } from '@/lib/types';
import { JSDOM } from 'jsdom';


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
const processNode = (node: Node, keyPrefix: string): React.ReactNode => {
    if (node.nodeType === 3) { // Text node
        const text = node.textContent || '';
        const parts = text.split(/({glossary:[a-zA-Z0-9_-]+})|({currency:\d+:[A-Z]{3}})/g).filter(Boolean);

        return parts.map((part, index) => {
            const glossaryMatch = part.match(/{glossary:([a-zA-Z0-9_-]+)}/);
            if (glossaryMatch) {
                const termId = glossaryMatch[1];
                return <GlossaryTerm key={`${keyPrefix}-${index}`} termId={termId} />;
            }
            
            const currencyMatch = part.match(/{currency:(\d+):([A-Z]{3})}/);
            if (currencyMatch) {
                const [, amount, currency] = currencyMatch;
                return <Currency key={`${keyPrefix}-${index}`} amount={Number(amount)} currency={currency} />;
            }

            return <React.Fragment key={`${keyPrefix}-${index}`}>{part}</React.Fragment>;
        });
    }

    if (node.nodeType === 1) { // Element node
        const element = node as Element;
        const tagName = element.tagName.toLowerCase();
        
        const children = Array.from(element.childNodes).map((child, i) => processNode(child, `${keyPrefix}-${tagName}-${i}`));

        const props: { [key: string]: any } = { key: keyPrefix };
        for (let i = 0; i < element.attributes.length; i++) {
            const attr = element.attributes[i];
            if(attr.name === 'class'){
                props.className = attr.value;
            } else {
                props[attr.name] = attr.value;
            }
        }

        return React.createElement(tagName, props, children);
    }
    
    return null;
}

export const renderContent = (htmlContent: string) => {
  if (typeof window === 'undefined') {
    // This is a simple server-side fallback to avoid using JSDOM on the server
    // for this particular function. It will just render the HTML as is.
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  }
  const dom = new JSDOM(`<!DOCTYPE html><body>${htmlContent}</body>`);
  const body = dom.window.document.body;
  return Array.from(body.childNodes).map((node, index) => processNode(node, `node-${index}`));
};


// --- TERM ---
interface GlossaryTermProps {
  termId: string;
}

function GlossaryTerm({ termId }: GlossaryTermProps) {
  const { openGlossary } = useGlossary();
  const displayTerm = termId.replace(/_/g, ' ');

  return (
    <Button
      variant="link"
      className="p-0 h-auto text-base align-baseline text-accent border-b border-accent border-dashed rounded-none"
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
