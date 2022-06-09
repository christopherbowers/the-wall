import { useContext } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import GlobalContext from '@contexts/userContext'

export default function Logout() {
  const global = useContext(GlobalContext)

  const router = useRouter()

  const handleLogout = async () => {
    await axios.post('/api/logout')
      .then(() => {
        global.update({
          athenticated: false,
          id: undefined
        })
      })
      .then(router.replace(router.asPath))
      .catch(error => error.message)
  }

  return (
      <Link href='/'>
        <a onClick={handleLogout}>Log Out</a>
      </Link>
  )
}
