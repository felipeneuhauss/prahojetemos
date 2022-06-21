/** @jsxRuntime automatic */
/** @jsxImportSource theme-ui */

import React from 'react';

function Footer() {
  return (
    <footer sx={{
      display: 'flex',
      flex: '1',
      py: '2rem',
      px: 0,
      bg: 'primary',
      borderTop: '1px solid #eaeaea',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
    }}
    >
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        prahojetemos.com.br -  Todos os direitos reservados®
      </a>
    </footer>
  );
}

export default Footer;
