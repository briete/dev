export const Footer: React.FC = () => (
  <footer>
    <div className="copy">© 2021 yanao.dev</div>
    <style jsx>{`
      footer {
        width: 100%;
        height: 60px;
        background-color: baigue;
        position: fixed;
        bottom: 0;
        color: black;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .copy {
      }
    `}</style>
  </footer>
);
