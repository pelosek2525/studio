import Link from 'next/link';
import { getGuideCategories } from '@/lib/guides';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function GuidesIndexPage() {
  const categories = getGuideCategories();

  return (
    <div className="container max-w-7xl py-12">
      <div className="space-y-4 text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
          Guides about Prague
        </h1>
        <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl">
          Your comprehensive resource for navigating life in the city.
        </p>
         <div className="mx-auto max-w-md">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search this website" className="pl-10" />
            </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Card key={category.slug} className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{category.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                {category.guides.map((guide) => (
                  <li key={guide.slug} className="flex">
                    <Link href={`/guides/${category.slug}/${guide.slug}`} passHref>
                        <span className="text-foreground/80 hover:text-primary transition-colors duration-300">
                           - {guide.title}
                        </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
