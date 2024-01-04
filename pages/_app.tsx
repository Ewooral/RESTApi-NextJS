// pages/_app.js
import "@/styles/globals.css";
import Layout from "./admin/Layout";

function Pages({
  Component,
  pageProps,
}: {
  Component: React.ComponentType;
  pageProps: any;
}) {
  return( 
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default Pages;
