import { siteMeta } from "lib/constants";
import siteImg from "images/ogp.jpg";

const { siteTitle, siteDesc, siteUrl, siteLocale, siteType } = siteMeta;

export const openGraphMetadata = {
  titel: siteTitle,
  description: siteDesc,
  url: siteUrl,
  siteName: siteTitle,
  images: [
    {
      url: siteImg.src,
      width: siteImg.width,
      height: siteImg.height,
    },
  ],
  locale: siteLocale,
  type: siteType,
};

export const twitterMetadata = {
  card: "summary_large_image",
  title: siteTitle,
  description: siteDesc,
  simags: [siteImg.src],
};
