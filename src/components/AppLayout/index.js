/**
 * Component that sets the general structure of the app
 */
import React from "react";
import Footer from "../Footer";

const AppLayout = (content, topbar, sidebar, Layout, hideFooter) => () => {
  return (
    <Layout>
      <Layout.Sidebar>{sidebar}</Layout.Sidebar>
      <Layout.Content>
        {topbar || null}
        {content}
        {hideFooter ? null : <Footer />}
      </Layout.Content>
    </Layout>
  );
};

export default AppLayout;
