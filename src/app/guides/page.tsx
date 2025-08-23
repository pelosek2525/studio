import Link from 'next/link';
import { getGuideCategories } from '@/lib/guides';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function GuidesIndexPage() {
  const categories = getGuideCategories();

  return (
    <div className="container max-w-6xl py-12">
      <div className="space-y-4 text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
          CityZen Guides
        </h1>
        <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl">
          Browse our comprehensive guides by category.
        </p>
      </div>
      <div className="grid gap-8">
        {categories.map((category) => (
          <div key={category.slug}>
            <h2 className="font-headline text-3xl font-bold text-primary mb-6">{category.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.guides.map((guide) => (
                <Link key={guide.slug} href={`/guides/${category.slug}/${guide.slug}`} passHref>
                  <Card className="flex flex-col h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
                    <CardHeader>
                      <CardTitle className="font-headline text-xl">{guide.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground">{guide.excerpt}</p>
                    </CardContent>
                    <div className="p-6 pt-0 flex justify-end">
                       <ArrowRight className="h-5 w-5 text-primary" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
