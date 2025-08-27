
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format, getMonth } from 'date-fns';
import { cs, enUS, uk, ru } from 'date-fns/locale';

interface Holiday {
    date: string;
    name_cs: string;
    name_en: string;
    name_uk: string;
    description_cs: string;
    description_en: string;
    description_uk: string;
    stores_open: boolean;
}

interface PublicHolidaysCalendarProps {
  holidays: Holiday[];
  locale: string;
}

const localeMap: { [key: string]: Locale } = {
    cs,
    en: enUS,
    uk,
    ru,
    kk: ru, // Fallback for Kazakh
};

export function PublicHolidaysCalendar({ holidays, locale }: PublicHolidaysCalendarProps) {
    const currentLocale = localeMap[locale] || enUS;
    
    const getName = (holiday: Holiday) => {
        return holiday[`name_${locale as 'cs' | 'en' | 'uk'}`] || holiday.name_en;
    }

    const getDescription = (holiday: Holiday) => {
        return holiday[`description_${locale as 'cs' | 'en' | 'uk'}`] || holiday.description_en;
    }

    const groupedByMonth = holidays.reduce((acc, holiday) => {
        const month = getMonth(new Date(holiday.date));
        if (!acc[month]) {
            acc[month] = [];
        }
        acc[month].push(holiday);
        return acc;
    }, {} as Record<number, Holiday[]>);


  return (
    <div className="space-y-12">
        {Object.entries(groupedByMonth).map(([month, monthHolidays]) => (
            <div key={month}>
                <h2 className="font-headline text-3xl font-bold text-primary mb-6 capitalize">
                    {format(new Date(monthHolidays[0].date), 'LLLL', { locale: currentLocale })}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {monthHolidays.map((holiday) => (
                        <Card key={holiday.date} className="flex flex-col">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="font-headline text-xl">{getName(holiday)}</CardTitle>
                                        <p className="text-muted-foreground font-semibold mt-1">
                                            {format(new Date(holiday.date), 'do MMMM', { locale: currentLocale })}
                                        </p>
                                    </div>
                                    <Badge variant={holiday.stores_open ? 'secondary' : 'destructive'}>
                                        {holiday.stores_open ? 'Obchody otevřené' : 'Obchody zavřené'}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-foreground/80">{getDescription(holiday)}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        ))}
    </div>
  );
}
