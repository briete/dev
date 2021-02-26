import styles from './Header.module.scss';

export const Header: React.FC = () => {
  return (
    <header>
      <nav className="navbar is-primary">
        <div className={`navbar-brand ${styles.logo}`}>
          <a className="navbar-item" href="https://briete.dev">
            briete.dev
          </a>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <a href="https://twitter.com/briete_ns">
              <span className="icon">
                <i className="fab fa-twitter"></i>
              </span>
            </a>
          </div>
          <div className="navbar-item">
            <a href="https://www.facebook.com/brietens">
              <span className="icon">
                <i className="fab fa-facebook"></i>
              </span>
            </a>
          </div>
          <div className="navbar-item">
            <a href="https://github.com/briete">
              <span className="icon">
                <i className="fab fa-github"></i>
              </span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};
