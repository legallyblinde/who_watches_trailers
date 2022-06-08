import React from 'react'
import './Card.scss'

const MovieCard = ({movie, selectedMovie}) => {

    const img_path = 'https://image.tmdb.org/t/p/w500'
  return (
   <div className='card' onClick={() => selectedMovie(movie)} >
        {/* <div className='card_info' >
          <div className="movie_title">
            <p>{movie.title}</p>
          </div>
          <div className="movie_overview">
            <p>{movie.overview}</p>
          </div>
        </div> */}
        <div className='img_container' >
          <img src={`https://image.tmdb.org/t/p/w500/`+movie.poster_path} alt="" />
        </div>
   </div>

  )
}

export default MovieCard;