import { getGuide, getAllGuidePaths } from '@/lib/guides';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Calendar, Clock } from 'lucide-react';
import { GuideContent } from '@/components/content/guide-content';
import { Separator } from '@/components/ui/separator';

type Props = {
  params: {
    category: string;
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = await getGuide(params.category, params.slug);

  if (!guide) {
    return {
      title: 'Guide not found',
    };
  }

  return {
    title: `${guide.meta.title} | CityZen Guide`,
    description: guide.meta.excerpt,
  };
}


export default async function GuidePage({ params }: Props) {
  const guide = await getGuide(params.category, params.slug);

  if (!guide) {
    notFound();
  }

  return (
    <div className="container max-w-4xl py-12">
        <article>
        <header className="mb-8">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
            {guide.meta.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">{guide.meta.excerpt}</p>
            <div className="mt-6 flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Last updated on {guide.meta.updatedAt}</span>
            </div>
            <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{guide.meta.readingTime} min read</span>
            </div>
            </div>
        </header>
        <Separator className="my-8" />
        
        <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90">
            <GuideContent content={guide.content} />
        </div>
        
        </article>
    </div>
  );
}

export async function generateStaticParams() {
    const paths = getAllGuidePaths();
    return paths;
}
