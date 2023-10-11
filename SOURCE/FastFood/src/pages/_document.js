import React from "react";
import PropTypes from "prop-types";
import Document, { Head, Main, NextScript } from "next/document";
import flush from "styled-jsx/server";
import { ServerStyleSheet } from "styled-components";
class MyDocument extends Document {
  constructor(props) {
    super(props);
  }
  static getInitialProps({ renderPage }) {}

  render() {
    const cssFiles = [
      // "/_next/static/style.css",
      "//use.fontawesome.com/releases/v5.2.0/css/all.css",
      "//fonts.googleapis.com/css?family=Roboto:300,400,500",
      // '//stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css',
      "../static/bootstrap.min.css",
      "../static/style.css",
      "../static/home.css",
      "../static/profile.css",
      "../static/dashboardComponent.css",
      "../static/product.css",
      "../static/quill.snow.css",
      "../static/react-draft-wysiwyg copy.css",
      "../static/dashboard.css",
      "../static/user.css",
      "../static/footer.css",
      "../static/header.css",
      "../static/login.css",
      "../static/slick.css",
    ];

    const jsFiles = [
      "//cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js",
      // '//code.jquery.com/jquery-3.1.1.min.js',
      "../static/jquery.min.js",
      "/_next/static/commons/main.js",
      "//stackpath.bootstrapcdn.com/bootstrap/4.1.2/js/bootstrap.min.js",
      "//cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
    ];

    const { pageContext } = this.props;

    return (
      <html lang="en" dir="ltr">
        <Head>
          <title>Fast Food</title>
          <meta httpEquiv="Content-Type" content="text/html; charSet=utf-8" />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name="viewport"
            content={
              "user-scalable=0, initial-scale=1, " +
              "minimum-scale=1, width=device-width, height=device-height"
            }
          />
          {/* PWA primary color */}
          <meta
            name="theme-color"
            content={pageContext.theme.palette.primary.main}
          />
          <meta charSet="utf-8" />

          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <link
            rel="shortcut icon"
            type="image/vnd.microsoft.icon"
            href="../static/images/logo.png"
          />
          <link
            rel="apple-touch-icon"
            type="image/png"
            href="../static/images/logo.png"
          />
          {/* <meta name="description" content="HRC" />
          <meta name="keywords" content="" />
          <link rel="canonical" href="https://hrcvn.tk/" />
          <meta property="og:url" content="https://hrcvn.tk/" />
          <meta property="og:title" content="" />
          <meta property="og:description" content="" />
          <meta property="og:image" content="https://hrc.com.vn/favicon/favicon-96x96.png" />
          <meta property="og:type" content="website" />
          <meta property="fb:app_id" content="329967930705976" />
          <meta name="popads-verification-1412279" value="ed115e5aaae12215765c6b4286d3a4da" />
          <meta name="referrer" content="always" /> */}

          {cssFiles.map((c, i) => (
            <link key={i} href={c} rel="stylesheet" />
          ))}

          {this.props.styleTags}

          {/*  End Google Tag Manager  */}
        </Head>
        <body>
          {/* <!-- Google Tag Manager (noscript) --> */}
          <noscript />
          {/* <!-- End Google Tag Manager (noscript) --> */}
          <Main />
          <NextScript />
          {jsFiles.map((c, i) => (
            <script key={i} src={c} />
          ))}
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  let pageContext;
  const sheet = new ServerStyleSheet();
  const page = ctx.renderPage(Component => {
    const WrappedComponent = props => {
      pageContext = props.pageContext;
      return sheet.collectStyles(<Component {...props} />);
    };

    WrappedComponent.propTypes = {
      pageContext: PropTypes.object.isRequired
    };

    return WrappedComponent;
  });

  const styleTags = sheet.getStyleElement();

  return {
    ...page,
    pageContext,
    styleTags,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: (
      <React.Fragment>
        <style
          id="jss-server-side"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: pageContext.sheetsRegistry.toString()
          }}
        />
        {flush() || null}
      </React.Fragment>
    )
  };
};

export default MyDocument;
