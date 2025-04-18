import config from "@site/docusaurus.config";
import styles from "./home.page.module.css";

const HomePage: React.FC = () => {
  const { title, tagline } = config;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.branding} />
        <div className={styles["card-container"]}>
          <div className={styles.card}>
            <div className={styles.content}>
              <h1>{title}</h1>
              <p>{tagline}</p>
            </div>
            <div className={styles.actions}>
              <a href="/docs">Documentation</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
