
import React from 'react';
import { getGlossary } from '@/lib/guides';
import { GlossaryWrapper, GlossaryDialog, GlossaryTerm } from '@/components/content/glossary';
import { Currency } from '@/components/content/currency';
import { JSDOM } from 'jsdom';
import { NetSalaryCalculator } from '../tools/net-salary-calculator';


const WIDGET_MAP: Record<string, React.ComponentType> = {
    'net-salary-calculator': NetSalaryCalculator,
};

const processNode = (node: Node, keyPrefix: string): React.ReactNode => {
    if (node.nodeType === 3) { // Text node
        return node.textContent;
    }

    if (node.nodeType === 1) { // Element node
        const element = node as Element;
        const tagName = element.tagName.toLowerCase();

        if (tagName === 'button' && element.hasAttribute('data-glossary-term')) {
            const termId = element.getAttribute('data-glossary-term')!;
            return <GlossaryTerm key={keyPrefix} termId={termId}>{element.textContent}</GlossaryTerm>;
        }

        if (tagName === 'span' && element.hasAttribute('data-currency-amount')) {
            const amount = Number(element.getAttribute('data-currency-amount'));
            const code = element.getAttribute('data-currency-code')!;
            return <Currency key={keyPrefix} amount={amount} currency={code} />;
        }
        
        if (tagName === 'div' && element.hasAttribute('data-widget-name')) {
            const widgetName = element.getAttribute('data-widget-name')!;
            const WidgetComponent = WIDGET_MAP[widgetName];
            if (WidgetComponent) {
                return <div className="not-prose my-8"><WidgetComponent /></div>;
            }
        }
        
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

export function GuideContent({ content }: { content: string }) {
  const glossary = getGlossary();
  
  const dom = new JSDOM(`<!DOCTYPE html><body>${content}</body>`);
  const body = dom.window.document.body;
  const reactNodes = Array.from(body.childNodes).map((node, index) => processNode(node, `node-${index}`));

  return (
    <GlossaryWrapper>
        {reactNodes}
        <GlossaryDialog glossary={glossary} />
    </GlossaryWrapper>
  );
}
