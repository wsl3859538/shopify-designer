import { useEffect } from "react";
import { useFetcher } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  List,
  Link,
  InlineStack,
} from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import styles from "../routes/_index/styles.module.css";

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return null;
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const color = ["Red", "Orange", "Yellow", "Green"][
    Math.floor(Math.random() * 4)
  ];
  const response = await admin.graphql(
    `#graphql
      mutation populateProduct($product: ProductCreateInput!) {
        productCreate(product: $product) {
          product {
            id
            title
            handle
            status
            variants(first: 10) {
              edges {
                node {
                  id
                  price
                  barcode
                  createdAt
                }
              }
            }
          }
        }
      }`,
    {
      variables: {
        product: {
          title: `${color} Snowboard`,
        },
      },
    },
  );
  const responseJson = await response.json();
  const product = responseJson.data.productCreate.product;
  const variantId = product.variants.edges[0].node.id;
  const variantResponse = await admin.graphql(
    `#graphql
    mutation shopifyRemixTemplateUpdateVariant($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
      productVariantsBulkUpdate(productId: $productId, variants: $variants) {
        productVariants {
          id
          price
          barcode
          createdAt
        }
      }
    }`,
    {
      variables: {
        productId: product.id,
        variants: [{ id: variantId, price: "100.00" }],
      },
    },
  );
  const variantResponseJson = await variantResponse.json();

  return {
    product: responseJson.data.productCreate.product,
    variant: variantResponseJson.data.productVariantsBulkUpdate.productVariants,
  };
};

export default function Index() {
  const generateProduct = () =>{
    window.open('https://design.dinwow.com/#/designer_pc?product_id=3192&token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Njc1OTMwNzQsImlhdCI6MTc1MjA0MTA3NCwia2V5IjoiZmFjdG9yeTp1c2VyOnByZXBvZDo1MzcxNzUyMDQxMDc0IiwidGFnIjoyLCJ1dWlkIjoiNThkZTVkYWYtNGM4YS00ODJhLWExZWMtNzk1MmEyMmVhMWFkIn0.j2uoWYIDqc0yEC3Wp1D2XL5CsBNkzysx3me-3B8yQtYrVRqX11bCMcQWgHEYXS3hXmaYvoed5lc_Q0QPh18LVQ&design=children&childOrderId=20702162804684657&sku=蓝色-4pcs-丝网印刷&designTemplate=https://798oss.oss-cn-shanghai.aliyuncs.com/template/13de5200c7hg9c0.json&templateId=244973518115&website=https://pre.dinwow.com/api')
  };

  return (
    <Page>
      <button className={styles.designerBtn} variant="primary" onClick={generateProduct}>
        Open Designer3
      </button>
    </Page>
  );
}
