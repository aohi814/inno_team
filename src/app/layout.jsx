import { Inter } from "next/font/google";

import "./globals.css";

import Script from "next/script";

import { ThemeProvider } from "../components/theme-provider";

import Navbar from "../components/layout/Navbar";

import Footer from "../components/layout/Footer";

import { GA_MEASUREMENT_ID } from "../../libs/config";



const inter = Inter({ subsets: ["latin"] });



const baseUrl = "https://supervalue.info";



export const metadata = {

  metadataBase: new URL(baseUrl),

  title: {

    default: "Supervalue LLC | IT Consulting & Talent Sourcing",

    template: "%s | Supervalue LLC"

  },

  description: "Supervalue LLC helps businesses with IT consulting, vetted talent sourcing, and software delivery. US-based, remote-ready, engineering-led.",

  keywords: [

    "Supervalue LLC",

    "IT consulting",

    "IT staffing",

    "talent sourcing",

    "software development",

    "dedicated teams",

    "staff augmentation",

    "California",

    "web development",

    "product engineering",

  ],

  authors: [{ name: "Supervalue LLC" }],

  creator: "Supervalue LLC",

  publisher: "Supervalue LLC",

  alternates: {

    canonical: "/",

  },

  openGraph: {

    type: "website",

    locale: "en_US",

    url: baseUrl,

    siteName: "Supervalue LLC",

    title: "Supervalue LLC | IT Consulting & Talent Sourcing",

    description: "Strategic IT consulting and talent sourcing for teams that need results—not hype.",

    images: [

      {

        url: "/og-image.jpg",

        width: 1200,

        height: 630,

        alt: "Supervalue LLC — IT Consulting & Talent Sourcing",

      },

    ],

  },

  twitter: {

    card: "summary_large_image",

    title: "Supervalue LLC | IT Consulting & Talent Sourcing",

    description: "IT consulting, talent sourcing, and software delivery from a US-based engineering team.",

    images: ["/og-image.jpg"],

    creator: "@SupervalueLLC",

    site: "@SupervalueLLC",

  },

  robots: {

    index: true,

    follow: true,

    googleBot: {

      index: true,

      follow: true,

      "max-video-preview": -1,

      "max-image-preview": "large",

      "max-snippet": -1,

    },

  },

  icons: {

    icon: "/favicon.jpg",

    shortcut: "/favicon.jpg",

    apple: "/favicon.jpg",

  },

};



export default function RootLayout({ children }) {

  return (

    <html lang="en" suppressHydrationWarning>

      <body className={inter.className}>

        <Script

          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}

          strategy="afterInteractive"

        />

        <Script id="ga-init" strategy="afterInteractive">{`

          window.dataLayer = window.dataLayer || [];

          function gtag(){dataLayer.push(arguments);}

          gtag('js', new Date());

          gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: true });

        `}</Script>

        <ThemeProvider

          attribute="class"

          defaultTheme="system"

          enableSystem

          disableTransitionOnChange

        >

          <div className="flex flex-col min-h-screen">

            <Navbar />
            
            <main className="flex-grow">{children}</main>

            <Footer />

          </div>

        </ThemeProvider>

      </body>

    </html>

  );

}
