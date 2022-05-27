import Head from "next/head";
import Link from "next/link";

import Layout from "@components/Layout";
import Container from "@components/Container";
import Button from "@components/Button";

import styles from "@styles/Page.module.scss";

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { buildImage } from "@lib/cloudinary";

export default function Home({ home, products }) {
  const { heroTitle, heroText, heroLink, heroBackground } = home;
  const title = "Huellitas y Más";
  const imageUrl = buildImage(heroBackground.public_id).toURL();
  console.log(imageUrl, "imageUrl");
  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Get your Space Jelly gear!" />
      </Head>

      <Container>
        <h1 className="sr-only">{title}</h1>

        <div className={styles.hero}>
          <Link href={heroLink}>
            <a>
              <div className={styles.heroContent}>
                <h2>{heroTitle}</h2>
                <p>{heroText}</p>
              </div>
              <img className={styles.heroBackground} src={imageUrl} alt="" />
            </a>
          </Link>
        </div>

        <h2 className={styles.heading}>Nuevo Closet</h2>

        <ul className={styles.products}>
          {products.map((product) => {
            const imageUrl = buildImage(product.image.public_id)
              .resize("w_800,h_1000")
              .toURL();
            return (
              <li key={product.slug}>
                <Link href={`/products/${product.slug}`}>
                  <a>
                    <div className={styles.productImage}>
                      <img
                        width={product.image.width}
                        height={product.image.height}
                        src={imageUrl}
                        alt=""
                      />
                    </div>
                    <h3 className={styles.productTitle}>{product.name}</h3>
                    <p className={styles.productPrice}>${product.price}</p>
                  </a>
                </Link>
                <p>
                  <Button
                    className="snipcart-add-item"
                    data-item-id={product.id}
                    data-item-price={product.price}
                    data-item-url={`product/${product.slug}`}
                    data-item-image={product.image.url}
                    data-item-name={product.name}
                  >
                    Agregar al Carrito
                  </Button>
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://api-us-east-1.graphcms.com/v2/cl2gmsdmi38j701w0fx1iay6f/master",
    cache: new InMemoryCache(),
  });

  const data = await client.query({
    query: gql`
      query PageHome {
        page(where: { slug: "home" }) {
          id
          heroLink
          heroText
          heroTitle
          name
          slug
          heroBackground
        }
        products(where: { categories_some: { slug: "estreno" } }) {
          id
          image
          name
          price
          slug
        }
      }
    `,
  });

  const home = data.data.page;
  const products = data.data.products;
  return {
    props: {
      home,
      products,
    },
  };
}
