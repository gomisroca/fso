import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (e) => {
    e.preventDefault()
    const anecdoteContent = e.target.content.value
    e.target.content.value = ''
    dispatch(createAnecdote(anecdoteContent))
    dispatch(createNotification(`You created ${anecdoteContent}`))
  }

  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="content" />
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  )
}

export default AnecdoteForm