import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Contenedor_reg from '../../components/contenedor_reg'

export default function Home() {
  return (
    <div className={styles.container}>
    <main className={styles.reg}>
    <Contenedor_reg/>
    </main>
    </div>
  )
}