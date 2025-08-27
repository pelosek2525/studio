
import { PublicHolidaysCalendar } from '@/components/tools/public-holidays-calendar';
import holidayData from '@/../content/public-holidays.json';
import { getTranslations } from 'next-intl/server';
import { getLocale } from 'next-intl/server';

export default async function PublicHolidaysPage() {
  const t = await getTranslations('ToolsPage.publicHolidays');
  const locale = await getLocale();

  return (
    <div className="container max-w-5xl py-12">
      <div className="space-y-4 text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
          {t('title')}
        </h1>
        <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl">
          {t('description')}
        </p>
      </div>

      <PublicHolidaysCalendar holidays={holidayData.holidays} locale={locale} />
    </div>
  );
}
