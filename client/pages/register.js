import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '@styles/register.module.scss'
import axios from 'axios'
import { BASE_URL } from '../globals'

export default function Register() {

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = document.getElementById('registrationForm')

    await axios
      .post(`${BASE_URL}/user/register/`, {
        email: e.target.email.value,
        password: e.target.password.value
      })
      .then(() => {
        form.reset()
        alert('Thank you for registering!')
        router.push('/')
      }).catch(error => error.message)
  }


  return (
    <>

      <h2>Register</h2>
        <form id='registrationForm' className={styles.registrationForm} onSubmit={handleSubmit}>
          <label htmlFor='email' className={styles.required}>Email</label>
          <input type='email' name='email' required />

          <label htmlFor='password' className={styles.required}>Password</label>
          <input type='password' name='password' required minLength="8" />

          <button>Register</button>
        </form>
      <div>
      <p>
        Already have an account?{' '}
        <Link href='/login'>
          <a>Log in.</a>
        </Link>
        </p>
      </div>
    </>
  )
}
