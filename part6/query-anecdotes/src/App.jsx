import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({ 
    mutationFn: updateAnecdote,
    onSuccess: (updateAnecdote) => {
      const notes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], notes.map(anecdote => anecdote.id === updateAnecdote.id ? updateAnecdote : anecdote))
    },
  })
  
  const handleVote = (anecdote) => {    
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    notificationDispatch({type: "SET", payload: `Liked ${anecdote.content}`})
    setTimeout(() => notificationDispatch({type: "RESET"}), 5000)
  }

  const { data, isLoading, isError, error } = useQuery({queryKey: ['anecdotes'], queryFn: getAnecdotes})

  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>Anecdote Service Not Available: {error.message}</div>

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
