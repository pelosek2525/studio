import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Banknote, Briefcase, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const primaryActions = [
  {
    icon: <Building className="h-8 w-8 text-primary" />,
    title: 'Moving to Czechia',
    description: 'Visas, registration, and finding a place to live.',
    href: '/guides/moving-to-prague',
    cta: 'See Move Guides'
  },
  {
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    title: 'Find a Job',
    description: 'Navigating the job market and work permits.',
    href: '/guides/working-in-czechia',
    cta: 'Explore Jobs'
  },
  {
    icon: <Banknote className="h-8 w-8 text-primary" />,
    title: 'Start a Business',
    description: 'From trade licenses to setting up a company.',
    href: '/guides/starting-a-business',
    cta: 'Learn How'
  },
];

const secondaryActions = [
    { title: 'Bank Account', href: '/guides/personal-finance/opening-a-bank-account' },
    { title: 'Insurance', href: '/guides/insurance' },
    { title: 'Apartment', href: '/guides/apartment-life' },
    { title: 'Immigration', href: '/guides/immigration' },
    { title: 'Healthcare', href: '/guides/healthcare' },
    { title: 'Legal Matters', href: '/guides/legal-matters' },
];


export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative w-full py-20 md:py-32 lg:py-40 bg-card">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-primary">
            Welcome to Prague.
          </h1>
          <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl mt-4">
            Your practical, no-nonsense guide to life in the heart of Europe. We're here to help you navigate the beautiful chaos of the city.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/guides">
                Explore All Guides <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <Image 
          src="https://placehold.co/1920x1080.png"
          data-ai-hint="prague skyline"
          alt="Prague Skyline" 
          fill
          className="absolute inset-0 -z-10 object-cover opacity-10"
        />
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {primaryActions.map((feature) => (
              <Card key={feature.title} className="flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader className="flex flex-row items-center gap-4">
                  {feature.icon}
                  <CardTitle className="font-headline">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button asChild variant="link" className="p-0 h-auto text-primary">
                    <Link href={feature.href}>
                      {feature.cta} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl text-primary">What do you need?</h2>
                <p className="max-w-[900px] text-foreground/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Find quick links to the most common tasks and challenges.
                </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
                {secondaryActions.map((action) => (
                    <Button key={action.title} asChild variant="outline" size="lg">
                        <Link href={action.href}>{action.title}</Link>
                    </Button>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
}
