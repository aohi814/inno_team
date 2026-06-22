import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-md">
                <Image
                  src="/favicon.jpg"
                  alt="Supervalue Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold tracking-tight">Supervalue LLC</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Supervalue LLC connects businesses with vetted IT talent and strategic consulting—built for scale, compliance, and long-term partnerships.
            </p>
            <div className="mt-6 flex space-x-4">
              <a
                href="mailto:contact@supervalue.info"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="Email Supervalue LLC"
              >
                <Mail size={20} />
              </a>
              <address className="mt-2 flex flex-col space-y-1 text-sm not-italic">
                <span className="text-muted-foreground">Ridgecrest, CA, USA (HQ)</span>
                <span className="text-muted-foreground">Brooklyn, New York, USA</span>
              </address>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Services</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/services" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  IT Consulting
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Talent Sourcing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center md:flex md:items-center md:justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} Supervalue LLC. All rights reserved.
          </p>
          <p className="mt-4 text-xs text-muted-foreground md:mt-0">
            Strategic IT consulting and talent sourcing.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
