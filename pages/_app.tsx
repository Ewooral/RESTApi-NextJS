// pages/_app.tsx
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import "@/styles/globals.css";
import Layout from "./admin/Layout";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-community/styles/ag-theme-balham.css";

// Create a client
const queryClient = new QueryClient();

function Pages({
                   Component,
                   pageProps,
               }: {
    Component: React.ComponentType;
    pageProps: any;
}) {
    return (
        <QueryClientProvider client={queryClient}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </QueryClientProvider>
    );
}

export default Pages;