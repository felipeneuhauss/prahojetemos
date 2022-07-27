import { createContext, useContext, useState } from 'react';
import { TopNewEntity } from 'graphql/generated';

type MainTrendsProviderValueProps = {
    mainTrends: string[] | null;
    setMainTrends: (mainTrends: string[] | null) => void;
    setTopNews: (topNews: TopNewEntity) => void;
    topNews: TopNewEntity | null;
}

export const MainTrendsContext = createContext<MainTrendsProviderValueProps>({
  mainTrends: [],
  topNews: null,
  setTopNews: () => {},
  setMainTrends: () => {},
});

const MainTrendsProvider = ({ children }: { children: any }) => {
  const [mainTrends, setMainTrends] = useState<string[] | null>([]);
  const [topNews, setTopNews] = useState<TopNewEntity | null>(null);
  return (
    <MainTrendsContext.Provider value={{
      mainTrends, setMainTrends, topNews, setTopNews,
    }}
    >
      {children}
    </MainTrendsContext.Provider>
  );
};

export const useMainTrends = (): MainTrendsProviderValueProps => {
  const context = useContext(MainTrendsContext);
  if (!context) throw new Error('useMainTrends must be used within a MainTrendProvider');
  const {
    mainTrends, setMainTrends, topNews, setTopNews,
  } = context;
  return {
    mainTrends, setMainTrends, topNews, setTopNews,
  };
};

export default MainTrendsProvider;
