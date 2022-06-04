import { useState } from 'react'
import Head from 'next/head'
import { useContext, useEffect } from 'react'
import Link from 'next/link'
import styles from '@styles/home.module.scss'
import GlobalContext from '@contexts/userContext'
import { BASE_URL } from '../globals'
import { Post, PostForm } from '@components/.'
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

  useEffect(() => {
    const checkToken = async () => {
      // await fetch(`${BASE_URL}/token/refresh/`, { method: "POST", credentials: 'include' })
      await axios
        .post(`http://localhost:8000/api/token/refresh/`, { withCredentials: true }
            // headers: {
              // 'Content-Type': 'application/json',
              // 'Authorization': `Bearer ${global.token}`
            // }
          // }
        )
        .then((res) => {
          console.log(res)
        }).catch((error) => {error.message})
    }

    checkToken()

  },[])

 console.log(global.token)

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

        {global.token ? (
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
