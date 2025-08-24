
'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');
  
  return (
    <footer className="w-full mt-auto">
      <div className="container flex flex-col items-center justify-center gap-4 py-10">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/contact" className="hover:text-foreground">{t('contact')}</Link>
          <Link href="/donate" className="hover:text-foreground">{t('donate')}</Link>
          <Link href="/privacy" className="hover:text-foreground">{t('privacy')}</Link>
          <Link href="/terms" className="hover:text-foreground">{t('terms')}</Link>
        </div>
         <p className="text-center text-sm leading-loose text-muted-foreground">
            © {new Date().getFullYear()} City Guide. All Rights Reserved.
          </p>
      </div>
    </footer>
  );
}
