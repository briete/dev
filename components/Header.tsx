import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faFacebook,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

export const Header: React.FC = () => {
  return (
    <header>
      <div className="sns">
        <ul>
          <li>
            <a href="https://twitter.com/briete_ns">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/brietens">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
          </li>
          <li>
            <a href="https://github.com/briete">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </li>
        </ul>
      </div>
      <div className="logo">
        <a href="/">
          <img src="/logo.svg" alt="logo" />
        </a>
      </div>
      <nav className="category">
        <ul>
          <li>
            <a href="#">about</a>
          </li>
          <li>
            <a href="#">article</a>
          </li>
        </ul>
      </nav>
      <style jsx>{`
        header {
          width: 100%;
          height: 60px;
          background-color: black;
          color: white;
          position: fixed;
          top: 0;
          z-index: 100;
          font-size: 1.2em;
          font-weight: 600;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
        }
        .sns {
          display: flex;
          flex: 1;
        }
        .logo {
          display: flex;
          flex: 1;
          justify-content: center;
        }
        .category {
          display: flex;
          flex: 1;
          justify-content: flex-end;
        }
        ul {
          display: flex;
          list-style: none;
        }
        li {
          width: 100px;
        }
        a {
          margin: 0;
          color: white;
          text-decoration: none;
          font-weight: bold;
        }
      `}</style>
    </header>
  );
};
