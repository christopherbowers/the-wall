import Head from 'next/head'
import { TopNav } from '@components/.'
import styles from '@styles/home.module.scss'

export default function Layout ({ children }) {
  return (
    <div className={styles.container}>
    <Head>
      <title>The Wall App</title>
      <meta name="description" content="The Wall App" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
    <TopNav />
    { children }
    </main>
    </div>
  )
}
