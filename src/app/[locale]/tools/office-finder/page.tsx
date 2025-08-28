
import { OfficeFinder } from '@/components/tools/office-finder';
import officeData from '@/../content/offices.json';
import { getTranslations } from 'next-intl/server';


export default async function OfficeFinderPage() {
  const t = await getTranslations('ToolsPage.officeFinder');

  return (
    <div className="container max-w-7xl py-12">
      <div className="space-y-4 text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
          {t('title')}
        </h1>
        <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl">
          {t('description')}
        </p>
      </div>
      <OfficeFinder offices={officeData.offices} />
    </div>
  );
}
