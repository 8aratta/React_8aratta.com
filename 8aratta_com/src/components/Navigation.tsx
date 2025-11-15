import React from 'react';
import { Link } from 'react-router-dom';
import { mergeStyles } from '@fluentui/react';

const navClass = mergeStyles({
  padding: '1rem',
  background: '#f0f0f0',
  marginBottom: '2rem',
  display: 'flex',
  gap: '1rem',
  justifyContent: 'center',
  alignItems: 'center',
});

function Navigation() {
  return (
    <nav className={navClass}>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}

export default Navigation;
