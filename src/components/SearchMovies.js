import React, { useState, useEffect } from 'react'

function SearchMovies() {
    const [movies, setMovies] = useState([])
    const [name, setName] = useState("")
    const [error, setError] = useState("")


    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`http://www.omdbapi.com/?apikey=99eb9fd1&s=${name}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.Response == "False") {
                    throw new Error(data.Error)
                } else {
                    setMovies(data.Search)
                    setError("")
                    console.log(data)
                }
            })
            .catch((err) => {
                setError(err.message)
                setMovies([])
                console.log(err)
            })
    }

    console.log(movies)


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Search Movie</h1>
                <input
                    type='text'
                    placeholder='Enter an movie name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <button type='submit'>Search</button>
            </form>



            <div>
                {error && <p>Invalid movie name. Please try again.</p>}
                <ul>
                    {
                    movies && movies.map((item, index) => (
                        <li key={index}>
                            <img src={item.Poster} alt={item.Title} />
                            <h2>{item.Title}</h2>
                            <p>Type: {item.Type}</p>
                            <p>Year: {item.Year}</p>
                            <p>IMDB ID: {item.imdbID}</p>
                        </li>
                    ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default SearchMovies