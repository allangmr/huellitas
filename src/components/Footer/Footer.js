import styles from "./Footer.module.scss";

const Footer = ({ ...rest }) => {
  return (
    <footer className={styles.footer} {...rest}>
      <p> Huellitas y Más &copy; {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
