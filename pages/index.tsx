/** @jsxRuntime automatic */
/** @jsxImportSource theme-ui */

import type { NextPage } from 'next';
import googleTrends from 'google-trends-api';
import { Flex } from 'theme-ui';
import { useEffect } from 'react';
import slugify from 'slugify';
import { TrendingStory } from 'shared/types/Trends';
import TrendCard from 'components/TrendCard';
import { useMainTrends } from 'contexts/MainTrendsProvider';

export async function getStaticProps() {
  const realTimeTrends = await googleTrends.realTimeTrends({
    category: 'h',
    geo: 'BR',
  });

  const trendList = JSON.parse(realTimeTrends).storySummaries?.trendingStories
    .filter((trendingStory: TrendingStory) => trendingStory.articles.length > 2);

  return {
    props: {
      trends: trendList,
    },
    revalidate: 60 * 60,
  };
}

type Props = {
  trends: TrendingStory[]
};

const Home: NextPage<Props> = ({ trends }: Props) => {
  const { setMainTrends } = useMainTrends();

  useEffect(() => {
    setMainTrends(trends?.map((trend: { title: string}) => trend.title));
  }, []);

  return (
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
  );
};

export default Home;
