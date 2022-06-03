export default function Post({ posts }) {

  return (
    <>
      {posts.map(({id, wall_text}) => (
        <div key={id} data-id={id}>
          { wall_text }
        </div>
      ))}
    </>
  )
}
