
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { JSDOM } from 'jsdom';
import React from 'react';
import type { GuideCategory, Guide, Glossary, GuideMetadata } from './types';
import { Currency } from '@/components/content/currency';

const guidesDirectory = path.join(process.cwd(), 'content/guides');
const glossaryPath = path.join(process.cwd(), 'content/glossary.json');

export function getGlossary(): Glossary {
  if (!fs.existsSync(glossaryPath)) {
    return {};
  }
  const fileContents = fs.readFileSync(glossaryPath, 'utf8');
  return JSON.parse(fileContents);
}

export function getGuideCategories(): GuideCategory[] {
  const categorySlugs = fs.readdirSync(guidesDirectory);
  const categories = categorySlugs.map((slug) => {
    const articles = getGuidesForCategory(slug);
    const name = slug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());
    return {
      name,
      slug,
      guides: articles.map(a => a.meta),
    };
  });
  return categories.filter(c => c.guides.length > 0);
}

export function getGuidesForCategory(categorySlug: string): { meta: GuideMetadata, content: string }[] {
  const categoryPath = path.join(guidesDirectory, categorySlug);
  if (!fs.existsSync(categoryPath) || !fs.lstatSync(categoryPath).isDirectory()) {
    return [];
  }
  
  const fileNames = fs.readdirSync(categoryPath).filter(f => f.endsWith('.md'));

  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(categoryPath, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    
    return {
      meta: {
        title: matterResult.data.title,
        slug,
        category: categorySlug,
        excerpt: matterResult.data.excerpt,
        updatedAt: matterResult.data.updatedAt,
        readingTime: matterResult.data.readingTime,
      },
      content: matterResult.content,
    };
  });
}

function processNode(node: Node): Node {
    if (node.nodeType === 3) { // Text node
        const text = node.textContent || '';
        const parent = node.parentNode!;
        
        const regex = /({glossary:[a-zA-Z0-9_-]+})|({currency:[\d,]+:[A-Z]{3}})|({widget:[a-zA-Z0-9_-]+})/g;
        const parts = text.split(regex).filter(Boolean);

        if (parts.length > 1) {
            parts.forEach(part => {
                const glossaryMatch = part.match(/{glossary:([a-zA-Z0-9_-]+)}/);
                if (glossaryMatch) {
                    const termId = glossaryMatch[1];
                    const button = parent.ownerDocument.createElement('button');
                    button.setAttribute('data-glossary-term', termId);
                    button.textContent = termId.replace(/-/g, ' ');
                    parent.insertBefore(button, node);
                    return;
                }
                
                const currencyMatch = part.match(/{currency:([\d,]+):([A-Z]{3})}/);
                if (currencyMatch) {
                    const [, amount, currency] = currencyMatch;
                    const span = parent.ownerDocument.createElement('span');
                    span.setAttribute('data-currency-amount', amount.replace(/,/g, ''));
                    span.setAttribute('data-currency-code', currency);
                    parent.insertBefore(span, node);
                    return;
                }

                const widgetMatch = part.match(/{widget:([a-zA-Z0-9_-]+)}/);
                if (widgetMatch) {
                    const widgetName = widgetMatch[1];
                    const div = parent.ownerDocument.createElement('div');
                    div.setAttribute('data-widget-name', widgetName);
                    parent.insertBefore(div, node);
                    return;
                }
    
                parent.insertBefore(parent.ownerDocument.createTextNode(part), node);
            });
            parent.removeChild(node);
        }
    } else if (node.nodeType === 1) { // Element node
        Array.from(node.childNodes).forEach(child => processNode(child));
    }
    return node;
}


export async function getGuide(category: string, slug: string): Promise<Guide | null> {
  const filePath = path.join(guidesDirectory, category, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(matterResult.content);
  
  const dom = new JSDOM(processedContent.toString());
  const body = dom.window.document.body;
  
  processNode(body);

  return {
    meta: {
      title: matterResult.data.title,
      slug,
      category,
      excerpt: matterResult.data.excerpt,
      updatedAt: matterResult.data.updatedAt,
      readingTime: matterResult.data.readingTime,
    },
    content: body.innerHTML,
  };
}

export function getAllGuidePaths() {
    const categories = fs.readdirSync(guidesDirectory);
    const paths = categories.flatMap(category => {
        const categoryPath = path.join(guidesDirectory, category);
        if (!fs.lstatSync(categoryPath).isDirectory()) {
            return [];
        }
        const files = fs.readdirSync(categoryPath);
        return files.map(file => ({
            params: {
                category,
                slug: file.replace(/\.md$/, ''),
            }
        }));
    });
    return paths;
}
