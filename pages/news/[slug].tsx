/** @jsxRuntime automatic */
/** @jsxImportSource theme-ui */

import { Flex, Link } from 'theme-ui';
import apolloConnection from 'resources/apolloConnection';
import {
  GetAllTopNewsPath, GetTopNewsBySlug, TopNew, TopNewEntity,
} from 'graphql/generated';
import PageLayout from 'layouts/PageLayout';
import Seo from 'components/Seo';
import { NextPageWithLayout } from '../_app';

export async function getStaticPaths() {
  const { data: { topNews: { data: slugs } } } = await apolloConnection
    .query({ query: GetAllTopNewsPath });

  const paths = slugs.map((item: TopNewEntity) => ({
    params: { slug: item.attributes?.slug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }: { params: { slug: string }}) {
  const topNews = await apolloConnection
    .query({ query: GetTopNewsBySlug, variables: { slug: params.slug } });

  if (!topNews.data?.topNews?.data?.length) {
    return {
      props: {},
      notFound: true,
    };
  }

  const [topNewsData] = topNews.data.topNews.data;

  return {
    props: { topNews: topNewsData.attributes },
  };
}

type PageProps = {
    topNews: TopNew
}

const NewsPage: NextPageWithLayout<PageProps> = ({ topNews }: PageProps) => (
  <Flex>
    <Seo title={topNews.title} />
    <Flex sx={{
      flexDirection: 'column', maxWidth: 1024, margin: '20px auto', px: [20, null, null, 0],
    }}
    >
      <h1>{topNews.title}</h1>
      <small sx={{ color: 'secondary' }}>
        Publicado em
        {' '}
        {topNews.createdAt}
      </small>
      {/* In case of edited content */}
      <p dangerouslySetInnerHTML={{ __html: topNews.description }} />
      <Flex sx={{ justifyContent: 'space-between' }}>
        <Link href="/" sx={{ color: '#444' }}>Home</Link>
        {topNews.url && (
        <Link
          href={topNews.url}
          sx={{
            bg: 'primary', color: 'white', p: '10px 20px', cursor: 'pointer',
          }}
        >
          Mais informações
        </Link>
        )}
      </Flex>
    </Flex>
  </Flex>
);

NewsPage.getLayout = (page) => <PageLayout>{page}</PageLayout>;

export default NewsPage;
