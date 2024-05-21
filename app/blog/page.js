import { getAllPosts } from "lib/api";
import Container from "components/container";
import Hero from "components/hero";
import Posts from "components/posts";
import getImage from "lib/getImage";

import { siteMeta } from "lib/constants";
const { siteTitle, siteUrl } = siteMeta;
import { openGraphMetadata, twitterMetadata } from "lib/baseMetadata";

// ローカルの代替アイキャッチ画像
import { eyecatchLocal } from "lib/constants";

export default async function Blog() {
  const posts = await getAllPosts();

  for (const post of posts) {
    if (!post.hasOwnProperty("eyecatch")) {
      post.eyecatch = eyecatchLocal;
    }
    const { base64 } = await getImage(post.eyecatch.url);
    post.eyecatch.blurDataURL = base64;
  }
  return (
    <Container>
      <Hero title="Blog" subtitle="Recent Posts" />

      <Posts posts={posts} />
    </Container>
  );
}

const pageTitle = " ブログ ";
const pageDesc = " ブログの記事一覧 ";
const ogpTitle = `${pageTitle} | ${siteTitle}`;
const ogpUrl = new URL("/blog", siteUrl).toString();

export const metadata = {
  title: pageTitle,
  description: pageDesc,
  openGraph: {
    ...openGraphMetadata,
    title: ogpTitle,
    description: pageDesc,
    url: ogpUrl,
  },
  twitter: {
    ...twitterMetadata,
    title: ogpTitle,
    description: pageDesc,
  },
};
