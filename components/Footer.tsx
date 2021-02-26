import styles from './Footer.module.scss';

export const Footer: React.FC = () => (
  <footer className="footer">
    <div className="content has-text-centered">
      <p>
        <strong>briete.dev</strong>. The source code is licensed.
        <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
        Copyright © 2020-2021 by briete
      </p>
    </div>
  </footer>
);
