import React from 'react';
import facebook from '../../img/facebook-white.svg';
import instagram from '../../img/instagram-white.svg';
import linkedin from '../../img/linkedin-white.svg';
import twitter from '../../img/twitter-white.svg';
import youtube from '../../img/youtube-white.svg';
import './footer.css';

const socials: string[] = [facebook, instagram, linkedin, twitter, youtube];
const otherLinks: string[] = [
  'Terms & Conditions',
  'Legal Disclaimer',
  'Contact',
];

export const Footer: React.FC = () => {
  return (
    <footer>
      <nav className="social">
        <ul>
          {socials.map((next, ind) => (
            <li key={ind}>
              <a
                href={
                  next === linkedin
                    ? 'https://www.linkedin.com/in/lachlan-bardwell'
                    : '#'
                }
              >
                <img src={next} alt={`Find us on ${next}`} />
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="copyFootRight">
        <span className="legal">
          {otherLinks.map((next, ind) => (
            <p key={ind}>
              <a
                href={
                  next == 'Contact'
                    ? 'mailto:Lachbardwell@gmail.com?subject=Enquiry from website'
                    : '#'
                }
              >
                {next}
              </a>
            </p>
          ))}
        </span>
      </div>
      <div className="copyFootLeft">
        <span>Made with Create React App and Material UI</span>
        <p>&copy; Lachlan Bardwell 2022</p>
        <a className="logo" href="https://clearbit.com">
          Logos provided by Clearbit
        </a>
      </div>
    </footer>
  );
};
