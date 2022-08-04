/** @jsxRuntime automatic */
/** @jsxImportSource theme-ui */

import googleTrends from 'google-trends-api';
import { Flex } from 'theme-ui';
import { ReactElement, useEffect } from 'react';
import slugify from 'slugify';
import { TrendingStory } from 'shared/types/Trends';
import TrendCard from 'components/TrendCard';
import { useMainTrends } from 'contexts/MainTrendsProvider';
import Seo from 'components/Seo';
import MainLayout from 'layouts/MainLayout';
import { GetLastTopNews, TopNewEntity } from 'graphql/generated';
import apolloConnection from 'resources/apolloConnection';
import { NextPageWithLayout } from './_app';

export async function getStaticProps() {
  const realTimeTrends = await googleTrends.realTimeTrends({
    category: 'h',
    geo: 'BR',
  });

  const trendList = JSON.parse(realTimeTrends).storySummaries
    ?.trendingStories.filter((trendingStory: TrendingStory) => trendingStory.articles.length > 2);

  const { data: { topNews } } = await apolloConnection.query({ query: GetLastTopNews });
  const [currentTopNews] = topNews.data;

  return {
    props: {
      trends: trendList,
      topNews: currentTopNews,
    },
    revalidate: 60 * 60,
  };
}

type Props = {
  trends: TrendingStory[],
  topNews: TopNewEntity
};

const Home: NextPageWithLayout<Props> = ({ trends, topNews }: Props) => {
  const { setMainTrends, setTopNews } = useMainTrends();

  useEffect(() => {
    setMainTrends(trends?.map((trend: { title: string}) => trend.title));
    setTopNews(topNews);
  }, []);

  return (
    <>
      <Seo title="Últimos termos pesquiados" />
      <Flex sx={{
        flexDirection: 'column',
        maxWidth: 1024,
        margin: '20px auto',
        px: [20, null, null, 0],
      }}
      >
        <Flex sx={{
          flexDirection: 'column',
          gap: 16,
        }}
        >
          {trends?.map((trend) => <TrendCard trend={trend} key={slugify(trend.title)} />)}
        </Flex>
      </Flex>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
