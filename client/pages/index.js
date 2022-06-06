// import { useState } from 'react'
import Head from 'next/head'
import { useContext, useEffect } from 'react'
import Link from 'next/link'
import styles from '@styles/home.module.scss'
import GlobalContext from '@contexts/userContext'
// import { BASE_URL } from '../globals'
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


// Home.getInitailProps = async (context) => {
//   const data = await fetch(`${BASE_URL}/token/refresh/`, {
//     credentials: 'include',
//     headers: {
//       cookie:  context.req.headers.cookie
//     },
//   })
//   .then(res => res.json()).then(console.log(data));
// }



export default function Home({ posts }) {

  const global = useContext(GlobalContext)

  useEffect(() => {

    const checkToken = async () => {
      // await fetch(`${BASE_URL}/token/refresh/`, { method: "POST", credentials: 'include' })
      await axios
        .post(`/api/refresh`,
          { headers: {
              withCredentials: true,
              // Cookie: ctx.req.headers.cookie
            }
          }
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

    if (typeof window !== 'undefined') {
      // checkToken()
      // console.log('window')
    }

  },[])

  // Paser JWT to get user ID
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

  if (global.token) {
    let id = parseJwt(global.token).user_id
    console.log(id)
    // console.log('token')
  }

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
