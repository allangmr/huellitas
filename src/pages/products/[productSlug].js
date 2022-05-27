import Head from "next/head";

import Layout from "@components/Layout";
import Header from "@components/Header";
import Container from "@components/Container";
import Button from "@components/Button";

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { buildImage } from "@lib/cloudinary";
import styles from "@styles/Product.module.scss";

export default function Product({ product }) {
  const imageUrl = buildImage(product.image.public_id).toURL();
  return (
    <Layout>
      <Head>
        <title>{product.name} - Huellitas y Más</title>
        <meta
          name="description"
          content={`Encuentra ${product.name} en Huellitas y Más`}
        />
      </Head>

      <Container>
        <div className={styles.productWrapper}>
          <div className={styles.productImage}>
            <img className={styles.heroImage} src={imageUrl} alt="" />
          </div>
          <div className={styles.productContent}>
            <h1>{product.name}</h1>
            <div
              className={styles.productDescription}
              dangerouslySetInnerHTML={{ __html: product.description?.html }}
            />
            <p className={styles.productPrice}>${product.price}</p>
            <p className={styles.productBuy}>
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
          </div>
        </div>
      </Container>
    </Layout>
  );
}
export async function getStaticProps({ params }) {
  const client = new ApolloClient({
    uri: "https://api-us-east-1.graphcms.com/v2/cl2gmsdmi38j701w0fx1iay6f/master",
    cache: new InMemoryCache(),
  });
  const slug = params.productSlug;
  const data = await client.query({
    query: gql`
      query PageProducts($slug: String) {
        product(where: { slug: $slug }) {
          id
          name
          price
          image
          description {
            html
          }
          slug
        }
      }
    `,
    variables: {
      slug: params.productSlug,
    },
  });
  const product = data.data.product;
  return {
    props: {
      product,
    },
  };
}
export async function getStaticPaths() {
  const client = new ApolloClient({
    uri: "https://api-us-east-1.graphcms.com/v2/cl2gmsdmi38j701w0fx1iay6f/master",
    cache: new InMemoryCache(),
  });

  const data = await client.query({
    query: gql`
      query PageProducts {
        products {
          id
          name
          price
          slug
          image
        }
      }
    `,
  });
  const paths = data.data.products.map((product) => {
    return {
      params: {
        productSlug: product.slug,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}
