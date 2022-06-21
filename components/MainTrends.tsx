/** @jsxRuntime automatic */
/** @jsxImportSource theme-ui */
import React from 'react';
import { useMainTrends } from 'contexts/MainTrendsProvider';
import { Flex, Link, Text } from 'theme-ui';
import slugify from 'slugify';

type TrendLinkProps = {
  trend: string;
}

const TrendLink: React.FC<TrendLinkProps> = ({ trend }: TrendLinkProps) => <li><Link href={`#${slugify(trend.toLowerCase())}`}>{trend}</Link></li>;

function MainTrends() {
  const { mainTrends } = useMainTrends();

  return (
    <Flex sx={{
      border: '1px solid #e5e5e5',
      bg: 'white',
      flexDirection: 'column',
      borderRadius: 4,
      pb: 20,
      height: 360,
      overflowY: 'auto',
    }}
    >
      <Text as="h2" sx={{ px: 24 }}>Principais termos pesquisados</Text>
      <ul sx={{
        px: 28,
        '> li': {
          listStyle: 'none',
          borderBottom: '1px solid #e5e5e5',
          '> a:hover': {
            textDecoration: 'underline',
          },
        },
      }}
      >
        {mainTrends && mainTrends?.map((trend: string) => <TrendLink trend={trend} key={slugify(`link-${trend}`)} />)}
      </ul>
    </Flex>
  );
}

export default MainTrends;
