import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script src="https://js.api.here.com/v3/3.1/mapsjs-core.js"></script>
          <script src="https://js.api.here.com/v3/3.1/mapsjs-service.js"></script>
          <script src="https://js.api.here.com/v3/3.1/mapsjs-ui.js"></script>
          <script src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js"></script>
          <link rel="stylesheet" type="text/css" href="https://js.api.here.com/v3/3.1/mapsjs-ui.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;