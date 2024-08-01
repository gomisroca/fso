
import { useNotificationDispatch } from '../NotificationContext'
import { createAnecdote } from '../requests'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const notes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], notes.concat(newAnecdote))
      notificationDispatch({type: "SET", payload: `Anecdote Created: ${newAnecdote.content}`})
      setTimeout(() => notificationDispatch({type: "RESET"}), 5000)
    },
    onError: (error) => {
      notificationDispatch({type: "SET", payload: error.response.data.error})
      setTimeout(() => notificationDispatch({type: "RESET"}), 5000)
    },
   })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes: 0})
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
