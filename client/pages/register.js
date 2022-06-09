import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '@styles/register.module.scss'
import axios from 'axios'
import { Button } from '@components/.'

export default function Register() {

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await axios
      .post('/api/register/', {
        email: e.target.email.value,
        password: e.target.password.value
      })
      .then(() => {
        alert('Thank you for registering!')
        router.push('/login')
      }).catch(error => error.message)
  }


  return (
    <div className={styles.register}>
      <h2>Register</h2>
        <form className={styles.register__form} onSubmit={handleSubmit}>
          <label htmlFor='email' className={styles.required}>Email</label>
          <input type='email' name='email' required />

          <label htmlFor='password' className={styles.required}>Password</label>
          <input type='password' name='password' required minLength="8" />

          <Button text={'Register'} />
        </form>
      <div>
      <p>
        Already have an account?{' '}
        <Link href='/login'>
          <a>Log in.</a>
        </Link>
        </p>
      </div>
    </div>
  )
}
