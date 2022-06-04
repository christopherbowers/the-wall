import styles from '@styles/postForm.module.scss'

export default function PostForm() {
  return (
    <div className={styles.postForm}>
      <form type="submit">
        <textarea name="text" id="" cols="30" rows="10" />
        <button>Post</button>
      </form>
    </div>
  )
}
