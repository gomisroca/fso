import React, { useState } from 'react'
import Country from './Country'

function Filter({countries}) {
    const [search, setSearch] = useState('')

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }

    const filteredCountries = search.length > 0 ? countries.filter(c => c.name.common.toLowerCase().includes(search.toLowerCase())) : []

        return (
            <>
            <input value={search} onChange={handleSearchChange} />
            {filteredCountries.length > 10 ?
                <p>Too many matches, specify another filter</p>
                : filteredCountries.length > 1 ?
                <div>
                    {filteredCountries.map(c => 
                        <div key={c.cca2}>
                            <span>{c.name.common}</span>
                            <button onClick={() => setSearch(c.name.common)}>Show</button>
                        </div>
                    )}
                </div>
                : filteredCountries.length == 1 ?
                <Country country={filteredCountries[0]} />
                : null
            }
            </>
        )
}

export default Filter