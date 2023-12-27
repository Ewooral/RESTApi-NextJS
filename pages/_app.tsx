// pages/_app.js
import "@/styles/globals.css";

function Pages({
  Component,
  pageProps,
}: {
  Component: React.ComponentType;
  pageProps: any;
}) {
  return <Component {...pageProps} />;
}

export default Pages;
