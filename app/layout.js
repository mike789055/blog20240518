import Header from "components/header";
import Footer from "components/footer";

import "styles/globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'

// Font Awesomeの設定
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { siteMeta } from "lib/constants";
import { openGraphMetadata, twitterMetadata } from "lib/baseMetadata";
const { siteTitle, siteDesc, siteLang, siteUrl, siteIcon } = siteMeta;

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata = {
  title: {
    template: `%s | ${siteTitle}`,
    default: siteTitle,
  },
  description: siteDesc,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "./",
  },
  icons: {
    icon: siteIcon,
    apple: siteIcon,
  },
  openGraph: {
    ...openGraphMetadata,
  },
  twitter: {
    ...twitterMetadata,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang={siteLang}>
      <body>
        <Header />
        <main>{children}</main>
        <GoogleAnalytics gaId={`${process.env.NEXT_PUBLIC_GA_ID}`} />
        <Footer />
      </body>
    </html>
  );
}
