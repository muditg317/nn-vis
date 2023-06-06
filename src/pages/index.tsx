import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { api } from "~/utils/api";

// import logo from "~/assets/NN-logo-final.svg";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>NN Visualizer</title>
        <meta name="description" content="Visualizer for various types of neural networks!" />
        <link key='icon-svg' rel="icon" href="favicon.svg"
          type="image/svg+xml" />
        <link key='ico-light' rel="icon" href="favicon-light.ico"
          media="(prefers-color-scheme: light)"
        />
        <link key='ico-dark' rel="icon" href="favicon-dark.ico"
          media="(prefers-color-scheme: dark)"
        />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <Image src={"favicon.svg"} width={100} height={100} alt={'logo'} className="w-1/2 aspect-square"></Image>
      </main>
    </>
  );
};

export default Home;
