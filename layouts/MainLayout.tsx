/** @jsxRuntime automatic */
/** @jsxImportSource theme-ui */

import { Box, ThemeProvider } from 'theme-ui';
import { toTheme } from '@theme-ui/typography';
import grandViewTheme from 'typography-theme-grand-view';
import React from 'react';
import Footer from 'components/Footer';
import Header from 'components/Header';
import MainTrendsProvider from 'contexts/MainTrendsProvider';

const theme = toTheme(grandViewTheme);

export const colors = {
  text: '#000',
  brackground: '#fff',
  primary: '#b80f0d',
  secondary: '#096E6E',
  accent: '#b85a0d',
};

function MainLayout({ children } : {children: React.ReactNode}) {
  return (
    <ThemeProvider theme={{ ...theme, colors }}>
      <MainTrendsProvider>
        <Box>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </Box>
      </MainTrendsProvider>
    </ThemeProvider>
  );
}

export default MainLayout;
