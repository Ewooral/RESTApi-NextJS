// pages/_app.js
import "@/styles/globals.css";
import Layout from "./admin/Layout";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-community/styles/ag-theme-balham.css";

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
