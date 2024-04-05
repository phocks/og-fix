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
            `https://ogto.vercel.app/api/external?url=https://www.theguardian.com/world/2024/apr/05/israeli-inquiry-blames-wck-aid-killings-on-grave-errors-by-military-personnel`
          }
        />
      </Head>
      <h1>Open graph fix.</h1>
    </div>
  )
}
