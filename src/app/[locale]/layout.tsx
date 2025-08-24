import type { Metadata } from 'next';
import '../globals.css';
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster"
import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'CityZen Guide',
  description: 'Your practical guide to life in the city.',
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default function LocaleLayout({
  children,
  params: { locale }
}: Readonly<LocaleLayoutProps>) {
  // Validate that the incoming `locale` parameter is valid
  const t = useTranslations('Header');
  if (!['en', 'cs'].includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale} className="scroll-smooth dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&family=Belleza&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("min-h-screen bg-background font-body antialiased flex flex-col")}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
