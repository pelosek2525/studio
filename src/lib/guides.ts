import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { GuideCategory, Guide, Glossary, GuideMetadata } from './types';

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


export async function getGuide(category: string, slug: string): Promise<Guide | null> {
  const filePath = path.join(guidesDirectory, category, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    meta: {
      title: matterResult.data.title,
      slug,
      category,
      excerpt: matterResult.data.excerpt,
      updatedAt: matterResult.data.updatedAt,
      readingTime: matterResult.data.readingTime,
    },
    content: contentHtml,
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
