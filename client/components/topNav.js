import { useContext } from 'react'
import Link from 'next/link'
import styles from '@styles/topNav.module.scss'
import { Logout } from '@components/.'
import GlobalContext from '@contexts/userContext'

export default function TopNav() {

  const global = useContext(GlobalContext)

  return (
    <div className={styles.nav}>
      <h1 className={styles.nav__header}>
        <Link href='/'>
          <a>The Wall App</a>
        </Link>
      </h1>
      {global.authenticated ? <Logout /> : null}
    </div>
  )
}
