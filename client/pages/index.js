import Head from 'next/head'
import { useContext, useEffect } from 'react'
import Link from 'next/link'
import styles from '@styles/home.module.scss'
import GlobalContext from '@contexts/userContext'
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

  // Check is access token is valid
  useEffect(() => {
    const varify = async () => {
      await axios.get('/api/verify')
        .then(global.update({
            authenticated: true
          })
        )
    }
    varify()
  },[])


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
