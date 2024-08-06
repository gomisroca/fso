import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../mutations'
import Select from 'react-select';

const AuthorForm = ({ authors }) => {
  const select_options = authors.map(a => ({ value: a.name, label: a.name }))
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [born, setBorn] = useState('')

  const [ editBirthYear ] = useMutation(EDIT_AUTHOR)

  const submit = (event) => {
    event.preventDefault()

    const name = selectedAuthor.value

    editBirthYear({ variables: { name, born } })

    setSelectedAuthor(null)
    setBorn('')
  }

  return (
    <div>
      <h2>Set Birth Year</h2>

      <form onSubmit={submit}>
        <div>
          Author
          <Select
            defaultValue={selectedAuthor}
            onChange={setSelectedAuthor}
            options={select_options}
          />
        </div>
        <div>
          Born 
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value, 10))}
          />
        </div>
        <button type='submit'>Update Author</button>
      </form>
    </div>
  )
}

export default AuthorForm