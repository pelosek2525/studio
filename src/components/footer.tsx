import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full mt-auto">
      <div className="container flex flex-col items-center justify-center gap-4 py-10">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/contact" className="hover:text-foreground">Contact</Link>
          <Link href="/donate" className="hover:text-foreground">Donate</Link>
          <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
          <Link href="/terms" className="hover:text-foreground">Terms and conditions</Link>
        </div>
         <p className="text-center text-sm leading-loose text-muted-foreground">
            © {new Date().getFullYear()} City Guide. All Rights Reserved.
          </p>
      </div>
    </footer>
  );
}
