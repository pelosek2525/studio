
import Link from 'next/link';
import { ArrowRight, Building, Briefcase, Store, HomeIcon, FileText, Banknote, ShieldCheck, Shield, Bike, Car, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getTranslations } from 'next-intl/server';

export default async function Home() {
  const t = await getTranslations('HomePage');

  const primaryActions = [
    {
      icon: <Building className="h-10 w-10 text-foreground/80" />,
      title: t('primaryAction1'),
      href: '/guides/moving-to-prague',
    },
    {
      icon: <Briefcase className="h-10 w-10 text-foreground/80" />,
      title: t('primaryAction2'),
      href: '/guides/working-in-czechia',
    },
    {
      icon: <Store className="h-10 w-10 text-foreground/80" />,
      title: t('primaryAction3'),
      href: '/guides/starting-a-business',
    },
  ];
  
  const secondaryActions = [
      { title: t('secondaryAction1'), href: '/guides/apartment-life/how-to-find-an-apartment', icon: <HomeIcon className="h-8 w-8 text-foreground/80" /> },
      { title: t('secondaryAction2'), href: '/guides/immigration/how-to-get-a-residence-permit', icon: <FileText className="h-8 w-8 text-foreground/80" /> },
      { title: t('secondaryAction3'), href: '/guides/personal-finance/how-to-choose-a-bank', icon: <Banknote className="h-8 w-8 text-foreground/80" /> },
      { title: t('secondaryAction4'), href: '/guides/insurance/how-to-choose-health-insurance', icon: <ShieldCheck className="h-8 w-8 text-foreground/80" /> },
      { title: t('secondaryAction5'), href: '/guides/insurance/how-to-choose-liability-insurance', icon: <Shield className="h-8 w-8 text-foreground/80" /> },
      { title: t('secondaryAction6'), href: '/guides/bureaucracy/tax-id-tax-number-and-vat-number', icon: <FileText className="h-8 w-8 text-foreground/80" /> },
      { title: t('secondaryAction7'), href: '/guides/getting-around/how-to-buy-and-ride-a-bicycle', icon: <Bike className="h-8 w-8 text-foreground/80" /> },
      { title: t('secondaryAction8'), href: '/guides/driving/how-to-buy-a-car', icon: <Car className="h-8 w-8 text-foreground/80" /> },
      { title: t('secondaryAction9'), href: '/guides/where-to-find/where-to-find-help', icon: <Users className="h-8 w-8 text-foreground/80" /> },
  ];

  return (
    <div className="flex flex-col items-center">
      <section className="w-full py-20 md:py-32 lg:py-40 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-primary">
            {t('welcome')}
          </h1>
          <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl mt-4">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <section className="w-full max-w-5xl px-4 md:px-6">
          <div className="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-3">
            {primaryActions.map((feature) => (
              <Link key={feature.title} href={feature.href} passHref>
                <Card className="flex h-32 flex-col items-center justify-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer bg-card">
                  <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
                    {feature.icon}
                    <p className="font-medium">{feature.title}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
      </section>

      <section className="w-full max-w-5xl py-16 md:py-24 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl text-primary">{t('secondaryTitle')}</h2>
        </div>
        <div className="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {secondaryActions.map((action) => (
                <Link key={action.title} href={action.href} passHref>
                    <Card className="flex h-32 flex-col items-center justify-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer bg-card">
                        <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
                            {action.icon}
                            <p className="font-medium">{action.title}</p>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
      </section>

      <div className="my-16">
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/guides">
            {t('allGuidesButton')} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </Button>
      </div>

    </div>
  );
}
