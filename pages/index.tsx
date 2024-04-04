import Head from 'next/head'

export default function Page() {
  return (
    <div>
      <Head>
        <meta name="og:title" content="Vercel Edge Network" />
        <meta name="og:description" content="Vercel Edge Network" />
        <meta
          name="og:image"
          content={
            
            `https://og-fix.vercel.app/api/dynamic-image?username=vercel`
          }
        />
      </Head>
      <h1>Open graph fix.</h1>
    </div>
  )
}
