
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
      router.replace(pathname, { locale: nextLocale });
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-5 w-5">
            <path fill="#eee" d="M0 0h512v512H0z"/>
            <path fill="#0057b7" d="M0 0h512v256H0z"/>
            <path fill="#ffd700" d="M0 256h512v256H0z"/>
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className="h-5 w-5">
            <path d="M0 0h3v2H0z" fill="#fff" />
            <path d="M0 1h3v1H0z" fill="#d52b1e" />
            <path d="M0 .667h3v.666H0z" fill="#0039a6" />
        </svg>
    )
}

function KazakhstanFlag() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 256" className="h-5 w-5">
            <rect fill="#00B0C7" width="512" height="256"/>
            <circle cx="256" cy="128" r="48" fill="#F7D600"/>
            <path d="M256,80 l-16,32 l32,0 z M256,176 l-16,-32 l32,0 z M208,128 l32,16 l-32,16 z M304,128 l-32,16 l32,16 z" fill="#F7D600"/>
            <path d="M32,0 V256 M44,0 V256 M56,0 V256 M68,0 V256 M80,0 V256 M92,0 V256" stroke="#F7D600" strokeWidth="4"/>
        </svg>
    )
}
