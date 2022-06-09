import { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '@styles/login.module.scss'
import axios from 'axios'
import GlobalContext from '@contexts/userContext'
import { Button } from '@components/.'

export default function LogIn() {

  const router = useRouter()
  const global = useContext(GlobalContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    await axios
      .post('/api/login', {
        email: e.target.email.value,
        password: e.target.password.value
      })
      .then((res) => global.token = res.data.access)
      .then(() => router.push('/'))
      .catch(error => error.message)
  }

  return (
    <div className={styles.login}>

      <h2>Log In</h2>
        <form className={styles.login__form} onSubmit={handleSubmit}>
          <label htmlFor='email' className={styles.login__formrequired}>Email</label>
          <input type='email' name='email' required />

          <label htmlFor='password' className={styles.login__formrequired}>Password</label>
          <input type='password' name='password' required minLength="8" />

          <Button text={'Login'} />
        </form>
      <div>
      <p>
        Don{``}t have an account?{' '}
        <Link href='/register'>
          <a>Register.</a>
        </Link>
        </p>
      </div>
    </div>
  )
}
