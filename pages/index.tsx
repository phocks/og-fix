import { GetServerSideProps } from "next";
import Head from "next/head";
import url from "url";
import http from "http";
import https from "https";
import { load } from "cheerio";

export default function Page({ ogImage, ogTitle, ogDescription, targetUrl }) {
  return (
    <div>
      <Head>
        <meta name="og:title" content={ogTitle || "Vercel Edge Network"} />
        <meta
          name="og:description"
          content={ogDescription || "Vercel Edge Network"}
        />
        <meta
          name="og:image"
          content={`https://ogto.vercel.app/api/external?url=${ogImage}`}
        />
        Redirect immediately to the target URL
        <meta httpEquiv="refresh" content={`0;url=${targetUrl}`} />
      </Head>
      <h1>...</h1>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const targetUrl = context.query.url as string;

  if (!targetUrl) {
    return {
      notFound: true,
    };
  }

  const parsedUrl = url.parse(targetUrl);
  const getter = parsedUrl.protocol === "https:" ? https.get : http.get;

  const data = await new Promise<string>((resolve, reject) => {
    getter(targetUrl, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => resolve(data));
      res.on("error", reject);
    });
  });

  const $ = load(data);
  const ogImage = $('meta[property="og:image"]').attr("content");
  const ogTitle = $('meta[property="og:title"]').attr("content");
  const ogDescription = $('meta[property="og:description"]').attr("content");

  return {
    props: {
      ogImage,
      ogTitle,
      ogDescription,
      targetUrl,
    },
  };
};
