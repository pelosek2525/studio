
'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import { useState, useTransition } from 'react';

const locales: Record<string, {name: string, flag: React.ReactNode}> = {
    cs: { name: 'Česky', flag: <CzechFlag /> },
    en: { name: 'English', flag: <UkFlag /> },
    uk: { name: 'Українська', flag: <UkraineFlag /> },
    ru: { name: 'Русский', flag: <RussiaFlag /> },
    kk: { name: 'Қазақша', flag: <KazakhstanFlag /> },
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (nextLocale: string) => {
    startTransition(() => {
      const newPath = pathname.startsWith(`/${locale}`) ? pathname.replace(`/${locale}`, `/${nextLocale}`) : `/${nextLocale}${pathname}`;
      router.replace(newPath);
    });
  };

  const CurrentFlag = locales[locale]?.flag || <Globe className="h-5 w-5" />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" disabled={isPending}>
          {CurrentFlag}
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(locales).map(([key, { name, flag }]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => handleLocaleChange(key)}
            className="flex items-center gap-2"
          >
            {flag}
            <span>{name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


function CzechFlag() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className="h-5 w-5">
            <rect width="3" height="2" fill="#fff"/>
            <path d="M0,0H3V1H0z" fill="#d7141a"/>
            <path d="M0,0L1.5,1L0,2z" fill="#11457e"/>
        </svg>
    )
}

function UkFlag() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="20" height="15" className="h-5 w-5">
            <clipPath id="t">
                <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
            </clipPath>
            <path d="M0,0 v30 h60 v-30 z" fill="#00247d"/>
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
            <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#fff" strokeWidth="10"/>
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#cf142b" strokeWidth="4"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#cf142b" strokeWidth="6"/>
        </svg>
    )
}
function UkraineFlag() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className="h-5 w-5">
            <path d="M0 0h3v2H0z" fill="#005BBB" />
            <path d="M0 1h3v1H0z" fill="#FFD500" />
        </svg>
    )
}
function RussiaFlag() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 6" width="21" height="14" className="h-5 w-5">
            <rect fill="#fff" width="9" height="3"/>
            <rect fill="#d52b1e" y="3" width="9" height="3"/>
            <rect fill="#0039a6" y="2" width="9" height="2"/>
        </svg>
    )
}

function KazakhstanFlag() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 256" className="h-5 w-5">
            <rect fill="#00B0C7" width="512" height="256"/>
            <g fill="#FFC91C">
                <path d="m192 128 32-16 32 16-32 16-32-16z"/>
                <path d="m224 80 16 32-16 16-16-16 16-32z"/>
                <path d="m224 176 16-32-16-16-16 16 16 32z"/>
                <path d="M118.4 0v256h19.2V0h-19.2zm-32 0v256h19.2V0H86.4zm64 0v256h19.2V0h-19.2z"/>
            </g>
        </svg>
    )
}
