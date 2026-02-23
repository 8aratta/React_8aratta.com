import React from 'react';
import { useMousePosition, useGradientRotation } from '../../hooks';
import { GradientBackground, Timeline, TimelineSection, TimelineEntry } from '../../components';
import { DEFAULT_GRADIENT_CONFIG, MOUSE_SMOOTHING } from '../../constants/gradient';
import { useTheme } from '../../contexts';
import styles from './About.module.css';

function About() {
  const { theme } = useTheme();
  const { mousePos, handleMouseMove, handleMouseLeave } = useMousePosition(MOUSE_SMOOTHING);
  const rotation = useGradientRotation({
    mousePos,
    baseRotation: DEFAULT_GRADIENT_CONFIG.baseRotation,
  });

  const homeGif = theme === 'dark' ? '/assets/images/Home_Light.gif' : '/assets/images/Home_Dark.gif';


  return (
    <div
      className={styles.container}
      data-theme={theme}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <GradientBackground rotation={rotation} />
      <div className={styles.content}>
        <h2>Welcome to 8aratta</h2>
        <p>Navigate through my timeline below to get a glimpse of what my website is all about.</p>

        <Timeline>

          {/* General Section */}
          <TimelineSection
            id="general"
            title="About 8aratta"
            description='8aratta is my personal label, an inofficial brand that represents my work, projects and online presence. It is a reflection of my identity and a way to share my passions and creations with the world.'
            orientation='right'
          >
            <TimelineEntry id="general-purpose" title="Purpose">
              <p>8aratta serves as a portfolio, blog and creative outlet for my web design and development projects.</p>
              <p>To put it in a nutshell it's my personal website and as you can see im still working things out. </p>
            </TimelineEntry>
            <TimelineEntry id="general-identity" title="Identity and History" >
              <p>The name "8aratta" is a play on my last name "Baratta", with the "B" replaced by an "8" to create a unique and memorable brand identity.</p>
              <p>Often I get the question: 'Why the number eight?'</p>
              <p>To put it bluntly I just grew into it so to say.
                I wanted a name that was distinctive and personal, and the number 8 has a certain visual appeal and symmetry that I liked.
                There are many coincidental connections to that number, like how my name "Domenico" has 8 letters, or St. Dominic's Day is celebrated on August 8th, but ultimately it was just a creative choice that felt right for me and my online presence.
              </p>
              <p> NOTE TO MYSELF:
                Maybe I should come up with a more interesting story about the name, something mystical or philosophical, to make it more intriguing for visitors.
                But for now, the simple truth is that I just liked how it looked and sounded.
                Oh, I really need to write a proper "About Me" section that tells my story, my background and my passions in a more engaging way than just a timeline of website features.
                And I need add some sort of quoting design to make it more visually appealing, maybe with some of that gradient background peeking through the text... oh youre reading this? Thats a secret note for myself, forget this last paragraph!
              </p>
            </TimelineEntry>
          </TimelineSection>

          {/* Website Structure Section */}
          <TimelineSection
            id="structure"
            title="Website Structure"
            description="Navigating through the different pages of my website"
          >
            <TimelineEntry id="structure-home" title="Home Page">
              <p>A simple hero section with an interactive gradient background</p>
              <img src={homeGif} alt="8aratta" draggable="false" loading='lazy' />
            </TimelineEntry>
            <TimelineEntry id="structure-about" title="About Page">
              <p>Timeline showcasing website features with snap scrolling and sticky headers.</p>
            </TimelineEntry>
          </TimelineSection>

          {/* Web Component Section */}
          <TimelineSection
            id="ui-features"
            title="Web Components"
            description="Highlighting some of the custom-built components and features used in this website"
            orientation='right'
          >
            <TimelineEntry id="feature-theme" title="Theme Support">
              <p>Light and dark mode with seamless transitions and context-driven styling.</p>
              <p> There are still things I need to iron out and work on (style-wise that is) like look at the links below ... atroucious I know. But ay that's Ad hoc development what can you do?</p>
            </TimelineEntry>
            <TimelineEntry id="feature-gradient" title="Interactive Gradient Background">
              <p>Mouse-responsive, theme-aware WebGL gradient for visual depth and interactivity.
                Kudos to <a href='https://www.youtube.com/@HankTheTankCoding/videos'>HankTheTank</a> who provided an awesome tutorial, which I used to add this nice little feature to my website.</p>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/KPM48d7iBAQ?si=OGTFypQQ_07jLed8" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
            </TimelineEntry>
            <TimelineEntry id="feature-timeline" title="Snap Scrolling Timeline">
              <p>Sections snap to viewport with sticky headers and smooth navigation.</p>
            </TimelineEntry>
          </TimelineSection>

          {/* Web Design Section */}
          <TimelineSection
            id="ux-features"
            title="Web Design"
            description="Explaining and showcasing some of the designs choices and principles applied to create a visually appealing and user-friendly experience"
            orientation='right'
          >
            <TimelineEntry id="hero-section" title="Hero Section Design" >
              <p>Clean, modern layout with a focus on typography and visual hierarchy.</p>
            </TimelineEntry>
            <TimelineEntry id="responsive-design" title="Responsive Design" >
              <p>Optimized for various screen sizes with adaptive layouts and touch-friendly interactions.</p>
            </TimelineEntry>

          </TimelineSection>

          {/* Planned Features */}
          <TimelineSection
            id="planned-features"
            title="On the Way"
            description="Here you will find some of the features and sections that I am planning to add to the website in the future, stay tuned!"
          >
            <TimelineEntry id="live-documentation" title="Live Documentation">
              <p>I want to bring life into the documentation of the different components I developed by creating a live documentation using markdown support</p>
            </TimelineEntry>
            <TimelineEntry id="projects" title="Projects Showcase">
              <p>A dedicated section to highlight some of my upcoming projects development and diy wise.</p>
            </TimelineEntry>
            <TimelineEntry id="custom-font" title="Custom Font">
              <p>I'm planning to design and implement a custom font that will be used across the website to enhance its unique identity and visual appeal.</p>
            </TimelineEntry>
          </TimelineSection>
        </Timeline>
      </div>
    </div>
  );
}

export default About;
