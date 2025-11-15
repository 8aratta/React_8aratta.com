import React from 'react';
import { mergeStyles } from '@fluentui/react';

const homeClass = mergeStyles({
  padding: '2rem',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '60vh',
});

const logoClass = mergeStyles({
  boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
  marginBottom: '1rem',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
});

function Home() {
  return (
    <div className={homeClass}>
      <h1>Home</h1>
      <p>This is the home page.</p>
    </div>
  );
}

export default Home;
