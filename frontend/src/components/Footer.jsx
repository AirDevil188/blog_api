import styles from "../components/Footer.module.css";

const Footer = () => {
  return (
    <>
      <footer>
        <section className={styles.footerSection}>
          <p>
            &copy; {new Date().getFullYear()}.
            <a href="https://github.com/AirDevil188/"> AirDevil188</a>
          </p>
        </section>
      </footer>
    </>
  );
};

export default Footer;
