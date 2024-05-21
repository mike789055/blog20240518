import { getPostBySlug, getAllSlugs } from "lib/api";
import { extractText } from "lib/extract-text";
import { prevNextPost } from "lib/prev-next-post";
import Container from "components/container";
import PostHeader from "components/post-header";
import PostBody from "components/post-body";
import {
  TwoColumn,
  TwoColumnMain,
  TwoColumnSidebar,
} from "components/two-column";
import ConvertBody from "components/convert-body";
import PostCategories from "components/post-categories";
import Pagination from "components/pagination";
import Image from "next/image";
import getImage from "lib/getImage";

// ローカルの代替アイキャッチ画像
import { eyecatchLocal } from "lib/constants";

import { siteMeta } from "lib/constants";
const { siteTitle, siteUrl } = siteMeta;
import { openGraphMetadata, twitterMetadata } from "lib/baseMetadata";

export default async function Post({ params }) {
  const slug = params.slug;
  const post = await getPostBySlug(slug);
  const { title, publishDate, content, categories } = post;
  const eyecatch = post.eyecatch ?? eyecatchLocal;
  const { base64, img } = await getImage(eyecatch.url);
  eyecatch.blurDataURL = base64;

  const allSlugs = await getAllSlugs();
  const [prevPost, nextPost] = prevNextPost(allSlugs, slug);

  return (
    <Container>
      <article>
        <PostHeader
          title={title}
          subtitle="Blog Article"
          publish={publishDate}
        />

        <figure>
          <Image
            key={eyecatch.slug}
            src={eyecatch.url}
            alt=""
            width={eyecatch.width}
            height={eyecatch.height}
            sizes="(min-width: 1152px) 1152px, 100vw"
            style={{ width: "100%", height: "auto" }}
            priority
            placeholder="blur"
            blurDataURL={eyecatch.blurDataURL}
          />
        </figure>

        <TwoColumn>
          <TwoColumnMain>
            <PostBody>
              <ConvertBody contentHTML={content} />
            </PostBody>
          </TwoColumnMain>
          <TwoColumnSidebar>
            <PostCategories categories={categories} />
          </TwoColumnSidebar>
        </TwoColumn>
        <Pagination
          prevText={prevPost.title}
          prevUrl={prevPost.slug}
          nextText={nextPost.title}
          nextUrl={nextPost.slug}
        />
      </article>
    </Container>
  );
}

export const dynamicParams = false;
export async function generateStaticParams() {
  const allSlugs = await getAllSlugs();

  return allSlugs.map(({ slug }) => {
    return { slug: slug };
  });
}

export async function generateMetadata({ params }) {
  const slug = params.slug;

  const post = await getPostBySlug(slug);
  const { title: pageTitle, publishDate: publish, content, categories } = post;

  const pageDesc = extractText(content);
  const ogpTitle = `${pageTitle} | ${siteTitle}`;
  const ogpUrl = new URL("/blog/${Slug}", siteUrl).toString();

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
