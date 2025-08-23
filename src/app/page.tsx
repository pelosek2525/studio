import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Calculator, Landmark, Map, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const featureSections = [
  {
    icon: <Landmark className="h-8 w-8 text-primary" />,
    title: 'Moving to the City',
    description: 'All you need to know about visas, registration, and getting started.',
    href: '/move/registration',
    cta: 'See Move Guides'
  },
  {
    icon: <Map className="h-8 w-8 text-primary" />,
    title: 'Living like a Local',
    description: 'Explore neighborhoods, find housing, and understand daily life.',
    href: '/live',
    cta: 'Explore Living'
  },
  {
    icon: <Wallet className="h-8 w-8 text-primary" />,
    title: 'Managing Your Money',
    description: 'From bank accounts to taxes, we cover the financial essentials.',
    href: '/money',
    cta: 'Learn About Money'
  },
  {
    icon: <Calculator className="h-8 w-8 text-primary" />,
    title: 'Helpful Tools',
    description: 'Calculators and tools to simplify your life in the city.',
    href: '/tools',
    cta: 'Use Our Tools'
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative w-full py-20 md:py-32 lg:py-40 bg-card">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-primary">
            Master Your City.
          </h1>
          <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl mt-4">
            CityZen Guide offers practical, no-nonsense advice for expats and locals. Navigate bureaucracy, find your perfect neighborhood, and manage your finances with our expert guides and tools.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/how-to">
                Start with a Guide <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/tools">
                Explore Tools
              </Link>
            </Button>
          </div>
        </div>
        <Image 
          src="https://placehold.co/1920x1080.png"
          data-ai-hint="city skyline"
          alt="City Skyline" 
          fill
          className="absolute inset-0 -z-10 object-cover opacity-10"
        />
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl text-primary">Everything You Need, In One Place</h2>
              <p className="max-w-[900px] text-foreground/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We've organized our guides and tools into clear categories to help you find what you need, fast.
              </p>
            </div>
          </div>
          <div className="mx-auto grid grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
            {featureSections.map((feature) => (
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
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium">Featured Guide</div>
            <h2 className="font-headline text-3xl font-bold tracking-tighter text-primary sm:text-4xl md:text-5xl">Step-by-Step Residence Registration</h2>
            <p className="max-w-[600px] text-foreground/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our most popular guide walks you through the entire process of registering your address, from booking an appointment to gathering the right documents.
            </p>
            <Button asChild size="lg">
              <Link href="/move/registration">
                Read the Guide <BookOpen className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="flex justify-center">
            <Image
              src="https://placehold.co/600x400.png"
              data-ai-hint="paperwork documents"
              alt="Featured Guide Image"
              width={600}
              height={400}
              className="overflow-hidden rounded-xl object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
