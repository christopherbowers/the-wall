import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '@styles/home.module.scss'
import { Post, PostForm } from '@components/.'

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

  const [authenticated, setAuthenticated] = useState(false)

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
        <div className={styles.wall}>

        {authenticated ? (
          <PostForm />
          ) : (
          <p>
            Please{' '}
            <Link href='login'>
              <a>log in</a>
            </Link>
            {' '}or{' '}
            <Link href='register'>
              <a>register</a>
            </Link>
            {' '}to post.
          </p>
          )}

          <Post posts={ posts } />
        </div>

      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}
