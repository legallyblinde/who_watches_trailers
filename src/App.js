
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.scss';
import MovieCard from './components/MovieCard/Card'
import { AiOutlineSearch } from 'react-icons/ai'
import YouTube from 'react-youtube';

function App() {
  const API_URL= 'https://api.themoviedb.org/3'
  const KEY = process.env.REACT_APP_API_KEY
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState('')
  const [selectedMovie, setSelectedMovie] = useState({})
  const [playTrailer, setPlayTrailer] = useState(false)
  
  useEffect( () => {
    fetchAPI()
  }, [])

  const fetchAPI = async (search) => {
    const type = search? '/search/movie?' : '/discover/movie?'
    const {data: {results} } =  await axios.get(`${API_URL}${type}`, {
      params: {
        api_key: KEY,
        query: search
      }
    })
    await selectMovie(results[0])
    setMovies(results)
  }

  //for trailer
  const fetchAPIvideo = async (id) => {
    const {data} = await axios.get(`${API_URL}/movie/${id}`,{
      params: {
        api_key: KEY,
        append_to_response : 'videos'
      }
    })
    return data
  }

  const selectMovie = async (movie) => {
    const data = await fetchAPIvideo(movie.id)
    setPlayTrailer(false)
    setSelectedMovie(data)
    console.log(data)
    window.scrollTo({top: 0, behavior: 'smooth'})
  } 


  //To display movies
  const renderMovies = () => (
    movies.map(movie => (
      <MovieCard key={movie.id} movie={movie} selectedMovie={selectMovie}/>
    ))
  )

  const searchMovies = (e) => {
     e.preventDefault()
     fetchAPI(search)
  }

  //To render trailer
  const renderTrailer = () => {
    const trailer = selectedMovie.videos.results.find(vdo => vdo.name.includes('Official Trailer') || vdo.name === 'Main Trailer' || vdo.name.includes('Trailer')) 
    return (
      <YouTube 
      videoId={trailer.key}
      className='youtube_container'
      opts={{
        width: '100%',
        height: '100%',
        playerVars: {
          controls: 0,
          autoplay: 1
        }
      }}
       />
    )
  }
  
  return (
    <div className="App">

     <div className="header">
       <h1 onClick={()=> window.location.reload()} >Who watches trailers</h1>
      <form onSubmit={searchMovies}>
       <input type="text" placeholder='Search...' onChange={(e) => setSearch(e.target.value)} />
       <button type="submit"> <AiOutlineSearch/> </button>
      </form>
     </div>

     <div className="hero">

          <div className='hero_texts'>
            <h1 className="hero_title">  {selectedMovie.title} </h1>
            <p className='hero_overview'> {selectedMovie.overview} </p>
          </div>

          <button className='button1' onClick={() => setPlayTrailer(true)} >Play </button>
          
          {playTrailer ?
            <button className='button2' onClick={() => setPlayTrailer(false)} >Close</button> :
            null}
         
          {selectedMovie.videos && playTrailer ? renderTrailer() : null}

          <div className="hero_backdrop">
            <img src={`https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`} alt="" />
          </div>
     </div>

     <div className="movie_list">
       {renderMovies()}
     </div>
    </div>
  );
}

export default App;
