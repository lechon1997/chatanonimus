import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Contenedor_login from '../components/contenedor_login'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Chat anónimo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/chuerk.png" />
      </Head>
     
      <main className={styles.main}>
        <Contenedor_login/>
      </main>

    </div>
  )
}
