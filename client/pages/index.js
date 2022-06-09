import { useContext, useEffect } from 'react'
import Link from 'next/link'
import GlobalContext from '@contexts/userContext'
import { Wall, PostForm } from '@components/.'
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

  return (
    <>
      <div>

      {global.authenticated ? (
        <PostForm />
        ) : (
        <p style={{margin: '0 0 1em'}}>
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

        <Wall posts={ posts } />
      </div>
    </>
  )
}
