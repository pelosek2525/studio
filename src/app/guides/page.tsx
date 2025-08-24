

import Link from 'next/link';
import { getGuideCategories } from '@/lib/guides';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Search,
  Plane,
  Briefcase,
  Home,
  Bus,
  Car,
  Heart,
  Dog,
  Users,
  Building,
  University,
  Scale,
  HandCoins,
  ShieldCheck,
  Map,
  BookUser,
  LogOut,
  Sparkles,
  Store,
} from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';

const categoryIcons: Record<string, React.ReactNode> = {
  'moving-to-prague': <Plane className="h-8 w-8 text-primary" />,
  'working-in-czechia': <Briefcase className="h-8 w-8 text-primary" />,
  'visiting-prague': <Map className="h-8 w-8 text-primary" />,
  'apartment-life': <Home className="h-8 w-8 text-primary" />,
  'starting-a-business': <Store className="h-8 w-8 text-primary" />,
  'the-basics': <BookUser className="h-8 w-8 text-primary" />,
  'personal-finance': <HandCoins className="h-8 w-8 text-primary" />,
  healthcare: <Heart className="h-8 w-8 text-primary" />,
  insurance: <ShieldCheck className="h-8 w-8 text-primary" />,
  'where-to-find': <Search className="h-8 w-8 text-primary" />,
  immigration: <Building className="h-8 w-8 text-primary" />,
  bureaucracy: <University className="h-8 w-8 text-primary" />,
  'legal-matters': <Scale className="h-8 w-8 text-primary" />,
  'family-and-friends': <Users className="h-8 w-8 text-primary" />,
  dogs: <Dog className="h-8 w-8 text-primary" />,
  'leaving-czechia': <LogOut className="h-8 w-8 text-primary" />,
  'getting-around': <Bus className="h-8 w-8 text-primary" />,
  driving: <Car className="h-8 w-8 text-primary" />,
  'bonus-content': <Sparkles className="h-8 w-8 text-primary" />,
};


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
        <div className="flex flex-wrap justify-center gap-2 pt-4">
            {categories.map((category) => (
                <Link key={category.slug} href={`#${category.slug}`} passHref>
                    <Button variant="outline" size="sm" className="h-8">
                        {category.name}
                    </Button>
                </Link>
            ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Card key={category.slug} id={category.slug} className="flex flex-col scroll-mt-24">
            <CardHeader className="flex-row items-center gap-4 space-y-0">
              {categoryIcons[category.slug] || <Plane className="h-8 w-8 text-primary" />}
              <CardTitle className="font-headline text-2xl">{category.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                {category.guides.map((guide) => (
                  <li key={guide.slug} className="flex">
                    <Link href={`/guides/${category.slug}/${guide.slug}`} passHref>
                        <span className="text-accent hover:text-accent/80 transition-colors duration-300">
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
