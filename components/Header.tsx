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
      </nav>
    </header>
  );
};
