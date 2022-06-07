import Head from 'next/head'
import { useContext, useEffect } from 'react'
import Link from 'next/link'
import styles from '@styles/home.module.scss'
import GlobalContext from '@contexts/userContext'
import { Post, PostForm, TopNav } from '@components/.'
import axios from 'axios'

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

  const global = useContext(GlobalContext)

  // Check is access token is valid and set auth state
  useEffect(() => {
    const varify = async () => {
      await axios.get('/api/verify')
        .then(() => {
          global.update({
            authenticated: true
          })
        }).catch(() => {
          global.update({
            authenticated: false
          })
        })
    }
    varify()
  },[])

  // Get user info and set ID to global context
  useEffect(() => {
    const getUser = async () => {
      await axios.get('/api/user')
        .then((res) => {
          global.update({
            authenticated: true,
            id: res.data.user.id
          })
        })
        .catch((error) => error.message)
    }

    if (global.authenticated) {
      getUser()
    }
  },[global.authenticated])

  console.log(global.id)

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
        <h1 className={styles.title}>Welcome to The Wall App</h1>
        <div className={styles.wall}>

        {global.authenticated ? (
          <PostForm />
          ) : (
          <p>
            Please{' '}
            <Link href='/login'>
              <a>log in</a>
            </Link>
            {' '}or{' '}
            <Link href='/register'>
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
