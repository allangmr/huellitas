import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

import Container from "@components/Container";
import { useSnipcart } from "use-snipcart";
import styles from "./Header.module.scss";

const Header = () => {
  const { cart = {} } = useSnipcart();
  return (
    <header className={styles.header}>
      <Container className={styles.headerContainer}>
        <p className={styles.headerTitle}>
          <Link href="/">
            <a>Huellitas y Más</a>
          </Link>
        </p>
        <ul className={styles.headerLinks}>
          <li>
            <Link href="/categories/catalogo">
              <a>Catalogo</a>
            </Link>
          </li>
          {/* <li>
            <Link href="/categories/estreno">
              <a>Estreno</a>
            </Link>
          </li> */}
          {/* <li>
            <Link href="/categories/hembra">
              <a>Closet de Hembra</a>
            </Link>
          </li>
          <li>
            <Link href="/categories/macho">
              <a>Closet de Macho</a>
            </Link>
          </li> */}
          <li>
            <Link href="/stores">
              <a>Sucursal</a>
            </Link>
          </li>
        </ul>
        <p className={styles.headerCart}>
          <button className="snipcart-checkout">
            <FaShoppingCart />
            <span>${cart.subtotal?.toFixed(2)}</span>
          </button>
        </p>
        {/* <ul className={styles.headerLocales}>
          <li>
            <Link href="#">
              <a>ES</a>
            </Link>
          </li>
        </ul> */}
      </Container>
    </header>
  );
};

export default Header;
