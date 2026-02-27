import React from 'react';
import { useTheme } from '../../contexts';
import styles from './About.module.css';

function About() {
  const { theme } = useTheme();
  const homeGif = theme === 'dark' ? '/assets/images/Home_Light.gif' : '/assets/images/Home_Dark.gif';


  return (
    <div data-theme={theme}>

    </div>
  );
}

export default About;
