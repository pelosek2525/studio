
'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

const RainbowHeart = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <defs>
        <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{stopColor: '#FF0000'}} />
          <stop offset="20%" style={{stopColor: '#FF7F00'}} />
          <stop offset="40%" style={{stopColor: '#FFFF00'}} />
          <stop offset="60%" style={{stopColor: '#00FF00'}} />
          <stop offset="80%" style={{stopColor: '#0000FF'}} />
          <stop offset="100%" style={{stopColor: '#8B00FF'}} />
        </linearGradient>
      </defs>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="url(#rainbow)" stroke="url(#rainbow)"></path>
    </svg>
  );

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
         <div className="flex items-center gap-2 text-center text-sm leading-loose text-muted-foreground">
            <p>© {new Date().getFullYear()} City Guide. All Rights Reserved.</p>
            <RainbowHeart />
         </div>
      </div>
    </footer>
  );
}
