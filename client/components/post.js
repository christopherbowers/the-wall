import styles from '@styles/post.module.scss'

export default function Post({ posts }) {

  return (
    <>
      {posts.map(({id, wall_text, posted_by}) => (
        <div
        key={id}
        data-userid={posted_by}
        className={styles.post}>
          { wall_text }
        </div>
      ))}
    </>
  )
}
