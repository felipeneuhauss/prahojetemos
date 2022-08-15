/** @jsxImportSource theme-ui */
/** @jsxRuntime automatic */

import { Box, Flex, Text } from 'theme-ui';
import Link from 'next/link';
import MainTrends from './MainTrends';
import { useMainTrends } from '../contexts/MainTrendsProvider';
import ellipsis from '../shared/helpers/ellipsis';

const Header = () => {
  const { topNews } = useMainTrends();
  return (
    <Box sx={{
      bg: 'primary',
      width: '100%',
      px: [20, null, null, 0],
      py: [20, null, null, 80],
    }}
    >
      <Flex
        sx={{
          width: ['100%', null, null, 1024],
          margin: '0 auto',
          flexDirection: ['column', null, null, 'row'],
          gap: 20,
          alignItems: 'flex-start',
        }}
      >
        <Flex sx={{
          color: 'white',
          width: ['100%', null, null, '50%'],
          flexDirection: 'column',
        }}
        >
          {!topNews?.attributes ? (
            <>
              <Text as="h1">As notícias mais pesquisadas da net nas últimas 24h</Text>
              <Text as="h2">
                Aqui você encontra as melhores materiais dos termos
                mais pesquisados da net nas últimas 24 horas.
              </Text>
            </>
          ) : (
            <Link href={`/news/${topNews?.attributes.slug}`} passHref>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>
                <Text as="h1">{topNews.attributes.title}</Text>
                <Text as="h2" dangerouslySetInnerHTML={{ __html: ellipsis(topNews.attributes.description) }} />
              </a>
            </Link>
          )}
        </Flex>
        <Flex sx={{ width: ['100%', null, null, '50%'], justifyContent: ['center', null, 'end'] }}>
          <MainTrends />
        </Flex>
      </Flex>
    </Box>
  );
};
export default Header;
