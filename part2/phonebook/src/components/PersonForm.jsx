import React, { useState } from 'react'
import personsService from '../services/persons'
import Notification from './Notification'

function PersonForm({ persons, handleSetPersons }) {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
  
    const addPerson = (event) => {
      event.preventDefault()
    
      let existingPerson = persons.find(p => p.name == newName)
      if (existingPerson) {
        if(confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
          existingPerson.number = newNumber

          personsService
          .update(existingPerson.id, existingPerson)
          .then(updatedPerson => {
            let newPersons = persons.filter(person => person.id != updatedPerson.id)
            newPersons.push(updatedPerson)
            handleSetPersons(newPersons)
            setSuccessMessage(`Updated ${newPerson.name}`)
          })
          .catch(error => {
            setErrorMessage(`Information of ${existingPerson.name} has already been removed from server.`)
          })
        }
      }
      else {
        const personObj = {
          name: newName,
          number: newNumber,
          id: String(persons.length + 1)
        }

        personsService
          .create(personObj)
          .then(newPerson => {
            handleSetPersons(persons.concat(newPerson))
            setSuccessMessage(`Added ${newPerson.name}`)
          })
          .catch(error => {
            console.log('Something went wrong while adding the person to the phonebook.')
            console.log(error)
          })

        setNewName('')
        setNewNumber('')
      }
    }
  
    const handleNameChange = (event) => {
      setNewName(event.target.value)
    }
  
    const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
    }
    
    return (
      <>
        <Notification message={successMessage} type='success' />
        <Notification message={errorMessage} type='error' />
        <form onSubmit={addPerson}>
            <div>
              Name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
              Number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
              <button type="submit">Add Person</button>
            </div>
        </form>
      </>
    )
}

export default PersonForm