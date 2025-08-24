// This file is the root of your application.
// It redirects the user to the default locale.
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/uk');
}
