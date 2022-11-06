import React from 'react';
import linkedin from '../../img/linkedin-white.svg';
import github from '../../img/GitHub-Mark-Light-64px.png';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import './footer.css';

const socials: string[] = [linkedin, github];

export const Footer: React.FC = () => {
  return (
    <footer>
      <nav className="social">
        <ul>
          {socials.map((next, index) => (
            <li key={index}>
              <a
                href={
                  next === linkedin
                    ? 'https://www.linkedin.com/in/lachlan-bardwell'
                    : 'https://github.com/lachlanbardwell/'
                }
              >
                <img src={next} alt={`Find us on ${next}`} />
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="footer-contact">
        <p>&copy; Lachlan Bardwell 2022</p>
        <span className="footer-a">
          <MailOutlineIcon />
          <a href="mailto:Lachbardwell@gmail.com?subject=Enquiry from website">
            &nbsp;Contact
          </a>
        </span>
        <a className="logo" href="https://clearbit.com">
          Logos provided by Clearbit
        </a>
      </div>
    </footer>
  );
};
