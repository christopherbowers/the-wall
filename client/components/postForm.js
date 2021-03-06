import { useContext } from 'react'
import GlobalContext from '@contexts/userContext'
import { useRouter } from 'next/router'
import axios from 'axios'
import styles from '@styles/postForm.module.scss'
import { Button } from '@components/.'

export default function PostForm() {

  const global = useContext(GlobalContext)

  // Refresh ServerSideProps
  const router = useRouter()
  const refreshData = () => {
    router.replace(router.asPath)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const textarea = document.getElementsByTagName("TEXTAREA")[0]

    const body = {
      posted_by: global.id,
      wall_text: e.target.text.value
    }
    await axios.post('/api/post', body)
      .then(res => {
        if (res.status < 300) {
          refreshData()
          textarea.value = ''
        }
      }).catch(err => err.message)
  }

  return (
    <div className={styles.postForm}>
      <form
        type="submit"
        onSubmit={handleSubmit}
        className={styles.postForm__form}
      >
        <textarea name="text" id="" cols="30" rows="3" />
        <Button text={'Post'} />
        </form>
    </div>
  )
}
