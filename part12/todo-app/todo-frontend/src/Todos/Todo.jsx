// eslint-disable-next-line react/prop-types
function Todo({ text, done }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70%', margin: 'auto' }}>
      <span data-testid="text">
        {text} 
      </span>
      <span data-testid="done">{done ? 'This todo is done' : 'This todo is not done'}</span>
    </div>
  )
}

export default Todo