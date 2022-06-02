import FullLayout from "../src/layouts/FullLayout";
import Head from "next/head";
import "../styles/style.scss";
// import "../styles/nextjs-argon-dashboard.css"
// import { AppConfig, UserSession } from "@stacks/connect";


// const appConfig = new AppConfig(["store_write", "publish_data"]);



// export var userSession = new UserSession({ appConfig });


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Ample Admin Next Js Free Aadmin Dashboard </title>
        <meta
          name="description"
          content="Ample Admin Next Js Aadmin Dashboard "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FullLayout>
        <Component {...pageProps} />
      </FullLayout>
    </>
  );
}

export default MyApp;
