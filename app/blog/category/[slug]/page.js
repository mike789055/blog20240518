import { getAllCategories, getAllPostsByCategory } from "lib/api";
import Container from "components/container";
import PostHeader from "components/post-header";
import Posts from "components/posts";
import getImage from "lib/getImage";

// ローカルの代替アイキャッチ画像
import { eyecatchLocal } from "lib/constants";

import { siteMeta } from "lib/constants";
const { siteTitle, siteUrl } = siteMeta;
import { openGraphMetadata, twitterMetadata } from "lib/baseMetadata";

export default async function Categories({ params }) {
  const catSlug = params.slug;

  const allCats = await getAllCategories();
  const cat = allCats.find(({ slug }) => slug === catSlug);
  const name = cat.name;

  const posts = await getAllPostsByCategory(cat.id);
  for (const post of posts) {
    if (!post.hasOwnProperty("eyecatch")) {
      post.eyecatch = eyecatchLocal;
    }
    const { base64 } = await getImage(post.eyecatch.url);
    post.eyecatch.blurDataURL = base64;
  }

  return (
    <Container>
      <PostHeader title={name} subtitle="Blog Category" />
      <Posts posts={posts} />
    </Container>
  );
}

export const dynamicParams = false;
export async function generateStaticParams() {
  const allCats = await getAllCategories();

  return allCats.map(({ slug }) => {
    return { slug: slug };
  });
}

export async function generateMetadata({ params }) {
  const catSlug = params.slug;

  const allCats = await getAllCategories();
  const cat = allCats.find(({ slug }) => slug === catSlug);

  const pageTitle = cat.name;
  const pageDesc = `${pageTitle}に関する記事`;
  const ogpTitle = `${pageTitle} | ${siteTitle}`;
  const ogpUrl = new URL("/blog/category/${catSlug}", siteUrl).toString();

  const metadata = {
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
  return metadata;
}
