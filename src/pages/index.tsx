import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Logo from "~/components/logo";
import NNVisualizer from "~/components/nn-visualizer";

// import { api } from "~/utils/api";

const Home: NextPage = () => {

  const footerLinkStyle = `underline duration-300 dark:text-zinc-400 dark:hover:text-purple-300 text-zinc-800 hover:text-purple-700 decoration-dotted underline-offset-4`;

  return (
    <>
      <Head>
        <title>NN Visualizer</title>
        <meta name="description" content="Visualizer for various types of neural networks!" />
        <link key='icon-svg' rel="icon" href="favicon.svg"
          type="image/svg+xml" />
        {/* <link key='ico-light' rel="icon" href="favicon-light.ico"
          media="(prefers-color-scheme: light)"
        />
        <link key='ico-dark' rel="icon" href="favicon-dark.ico"
          media="(prefers-color-scheme: dark)"
        /> */}
      </Head>
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-300">
        <header className="flex flex-row items-center justify-between w-full bg-gray-200 drop-shadow">
          <div className="flex flex-row items-center pl-2 text-purple-400 fill-current">
            {/* <Image src={"favicon.svg"} width={50} height={50} alt={'logo'} className="aspect-square fill-[#00ff00!]"></Image> */}
            {/* <img src={"/favicon.svg"} width={50} height={50} alt={'logo'} className="aspect-square fill-green-500"></img> */}
            <Logo className="w-12 aspect-square"></Logo>
            <h1 className="text-4xl italic font-semibold">Visualizer</h1>
          </div>
        </header>
        <main className="flex flex-col items-center justify-center w-full h-full">
          <NNVisualizer />
        </main>
        <footer className="flex w-full px-8 py-2 prose shadow-inner lg:px-0 md:px-8">
          <p className="m-0 text-sm dark:text-zinc-400 text-zinc-700 md:ml-16">
            <a
              className={footerLinkStyle}
              href="https://opensource.org/licenses/MIT"
              target={"_blank"}
              rel="noreferrer"
            >
              MIT
            </a>{" "}
            2023-present ©{" "}
            <a
              className={footerLinkStyle}
              href="https://github.com/muditg317"
              target={"_blank"}
              rel="noreferrer"
            >
              muditg317
            </a>
          </p>
        </footer>
      </div>
    </>
  );
};

export default Home;
