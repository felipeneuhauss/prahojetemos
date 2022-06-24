/** @jsxRuntime automatic */
/** @jsxImportSource theme-ui */

import { Article, TrendingStory } from 'shared/types/Trends';
import {
  Box,
  Flex, Grid, Link, Text, Image,
} from 'theme-ui';
import React from 'react';
import slugify from 'slugify';
import ellipsis from 'shared/helpers/ellipsis';

type ArticleProp = {
    article: Article
}

const TrendArticle: React.FC<ArticleProp> = ({ article }: ArticleProp) => (
  <Link
    href={article.url}
  >
    <Flex
      as="article"
      sx={{
        flexDirection: 'column',
        alignContent: 'start',
        justifyContent: 'start',
        '&:hover': {
          textDecoration: 'underline',
        },
      }}
    >
      <Text as="span" sx={{ fontWeight: 'bold', fontSize: 12, display: 'block' }} dangerouslySetInnerHTML={{ __html: article.articleTitle }} />
      <Text as="span" sx={{ color: 'grey', fontSize: 11, display: 'block' }} dangerouslySetInnerHTML={{ __html: article.snippet }} />
      <Text
        as="span"
        sx={{
          color: 'accent', fontSize: 11, fontWeight: 'bold', display: 'block',
        }}
      >
        {article.source}
        {' - '}
        {article.time}
      </Text>
    </Flex>
  </Link>
);

type TrendCardPros = {
    trend: TrendingStory
}

const TrendCard: React.FC<TrendCardPros> = ({ trend }: TrendCardPros) => (
  <Box
    as="section"
    id={slugify(trend.title.toLowerCase())}
    sx={{
      borderRadius: 4,
      border: '1px solid #e5e5e5',
      padding: 12,
    }}
  >
    <Flex sx={{
      width: '100%',
      gap: 12,
      alignItems: 'center',
      p: 12,
    }}
    >
      <Image
        src={`https:${trend.image.imgUrl}`}
        width={160}
        height={160}
        alt={trend.title}
        sx={{ minWidth: 160, maxHeight: 160 }}
      />
      <Text
        as="h3"
        sx={{
          fontWeight: 'bold',
          color: 'secondary',
          pl: 12,
          fontSize: [18, null, 32],
          width: ['50%', null, '100%'],
          maxHeight: [160, null, '15ch'],
          py: [0, null, 20],
          overflow: 'hidden',
        }}
      >
        {ellipsis(trend.title)}
      </Text>
    </Flex>
    <Grid gap={2} columns={[2, '1fr 1fr']} sx={{ p: 12 }}>
      {trend.articles?.slice(0, 4).map((article: Article) => (
        <TrendArticle article={article} key={`article-${slugify(article.articleTitle)}`} />
      ))}
    </Grid>
  </Box>
);

export default TrendCard;
