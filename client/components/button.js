import styles from '@styles/button.module.scss'

export default function Button({ text }) {
  return (
    <button className={styles.button}>
      { text ? text : 'Button'}
    </button>
  )
}
