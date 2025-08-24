// This file is the root of your application, but because we are using
// i18n, it is not used. Instead, see `src/app/[locale]/page.tsx`.

import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/cs');
}