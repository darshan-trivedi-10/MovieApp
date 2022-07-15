import { movies } from "./getmovies";
import React, { Component } from 'react'
// import dimg from '../car.jpg'


export default class banner extends Component {
    render() {
        let movie = movies.results[5];
        return (
            <>
                {
                    movie === '' ? <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div> :
                        <div className="card banner-card" >
                            <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="banner-img card-img-top" alt={movie.title} />
                            {/* <div className="card-body"> */}
                            <h1 className="card-title banner-title" >{movie.original_title}</h1>
                            <p className="card-text banner-text">{movie.overview}</p>
                            {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                            {/* </div> */}
                        </div>
                }
            </>
        )
    }
}

/* <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="banner-img card-img-top" alt={movie.title} /> */
