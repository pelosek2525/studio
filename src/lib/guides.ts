
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { JSDOM } from 'jsdom';
import type { GuideCategory, Guide, Glossary, GuideMetadata, TocEntry } from './types';

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

function processNode(node: Node, glossary: Glossary): void {
    if (node.nodeType === 3) { // Text node
        const text = node.textContent || '';
        const parent = node.parentNode!;
        
        if (parent.nodeName === 'A' || parent.nodeName === 'BUTTON' || parent.nodeName === 'SPAN') {
            return;
        }

        const regex = /({glossary:([a-zA-Z0-9_-]+)})|({currency:([\d,]+):([A-Z]{3})})/g;
        
        let lastIndex = 0;
        const nodesToAdd = [];
        let match;

        while ((match = regex.exec(text)) !== null) {
            // Add text before the match
            if (match.index > lastIndex) {
                nodesToAdd.push(parent.ownerDocument.createTextNode(text.substring(lastIndex, match.index)));
            }

            if (match[1] && match[2]) { // glossary term
                const termId = match[2];
                const termText = glossary[termId]?.term || termId.replace(/-/g, ' ');
                const button = parent.ownerDocument.createElement('button');
                button.setAttribute('data-glossary-term', termId);
                button.textContent = termText;
                nodesToAdd.push(button);
            } else if (match[3] && match[4] && match[5]) { // currency
                const amount = match[4];
                const currencyCode = match[5];
                const span = parent.ownerDocument.createElement('span');
                span.setAttribute('data-currency-amount', amount.replace(/,/g, ''));
                span.setAttribute('data-currency-code', currencyCode);
                nodesToAdd.push(span);
            }
            lastIndex = regex.lastIndex;
        }

        // Add any remaining text
        if (lastIndex < text.length) {
            nodesToAdd.push(parent.ownerDocument.createTextNode(text.substring(lastIndex)));
        }

        if (nodesToAdd.length > 0) {
            const fragment = parent.ownerDocument.createDocumentFragment();
            nodesToAdd.forEach(n => fragment.appendChild(n));
            parent.replaceChild(fragment, node);
        }

    } else if (node.nodeType === 1) { // Element node
        Array.from(node.childNodes).forEach(child => processNode(child, glossary));
    }
}


export async function getGuide(category: string, slug: string): Promise<Guide | null> {
  const filePath = path.join(guidesDirectory, category, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const matterResult = matter(fileContents);
  const glossary = getGlossary();

  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(matterResult.content);
  
  const dom = new JSDOM(processedContent.toString());
  const body = dom.window.document.body;

  processNode(body, glossary);

  // Extract ToC and add IDs to headings
  const toc: TocEntry[] = [];
  const headings = body.querySelectorAll('h2, h3');
  headings.forEach((heading) => {
    const text = heading.textContent || '';
    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    heading.id = id;
    toc.push({
      level: parseInt(heading.tagName.substring(1), 10),
      text,
      id,
    });
  });

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
    toc,
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
            category,
            slug: file.replace(/\.md$/, ''),
        }));
    });
    return paths;
}
