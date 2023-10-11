import React from 'react';
import PropTypes from 'prop-types';
import { Router } from '../routes/routes';

const securePageHoc = Page =>
  class SecurePage extends React.Component {
    static async getInitialProps(ctx) {
      const { mobxStore, res } = ctx;

      if (!mobxStore.isAuthenticated) {
        if (res && mobxStore.isServer) {
          res.redirect('/admin/login');
        } else {
          Router.pushRoute('login');
        }
      }

      const props = Page.getInitialProps && (await Page.getInitialProps(ctx));

      return { ...props, mobxStore };
    }

    render() {
      return <Page {...this.props} />;
    }
  };

export default Page => securePageHoc(Page);
