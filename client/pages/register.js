import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '@/styles/register.module.scss'

export default function Register() {

  const router = useRouter()

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await RegisterUser({
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password
    })
    setFormValues(initialState)
    // router.push('/')
  }


  return (
    <>

      <h2>Register</h2>
        <form className={styles.registrationForm} required onSubmit={handleSubmit}>
          <label htmlFor='email'>Email</label>
          <input type='text' name='email' required onChange={handleChange} />

          <label htmlFor='password'>Password</label>
          <input type='password' name='password' required minLength="8" onChange={handleChange} />

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
