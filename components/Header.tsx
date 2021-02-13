import styles from './Header.module.css';

export const Header: React.FC = () => {
  return (
    <header>
      <div className="logo">
        <a href="/">
          <img src="/logo.svg" alt="logo" />
        </a>
      </div>
      {/* <nav className="nav__sns">
        <ul>
          <li className="nav__item__sns">twitter</li>
          <li className="nav__item__sns">facebook</li>
        </ul>
      </nav> */}
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
        }
        header .logo {
          display: flex;
          flex-grow: 1;
          align-items: center;
          justify-content: center;
        }
        header ul {
          display: flex;
          list-style: none;
        }
        header a {
          margin: 0;
          color: white;
          text-decoration: none;
          font-size: 0.8em;
          text-align: left;
        }
      `}</style>
    </header>
  );
};
