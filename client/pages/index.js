import Head from 'next/head'
import styles from '@/styles/Home.module.scss'
import Post from '@/components/post'


export async function getServerSideProps() {
  const res = await fetch(
    'http://localhost:8000/api/posts/'
  )

  return {
    props: {
      posts: await res.json()
    }
  }
}


export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>The Wall App</title>
        <meta name="description" content="The Wall App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to The Wall App</h1>

        {posts ? <Post posts={ posts }/> : <div>Loading...</div>}

      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}
