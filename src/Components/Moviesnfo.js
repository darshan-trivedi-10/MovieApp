import React, { Component } from 'react'


export default class Moviesnfo extends Component {
    constructor() {
        super();
        this.state = ({
            moviesObj: ''
        })
    }

    componentDidMount() {
        let data = JSON.parse(localStorage.getItem('movies-details')) || [];
        this.setState({
            moviesObj: data
        })

    }

    render() {


        return (
            <div className='fontStyle magic-color infoHead'>
                <img src={`https://image.tmdb.org/t/p/original${this.state.moviesObj.backdrop_path}`} className="movies-img card-img-top" alt={this.state.moviesObj.title} />
                <ul >    
                     <hr/>
                    <li>
                        <h1>Movie Name : {this.state.moviesObj.original_title}</h1>
                    </li>
                    <hr/>
                    <li>
                        <h5> Media Type : {this.state.moviesObj.media_type}</h5>
                    </li>   
                    <hr/>
                    <li>
                        <h5>Original Language : {this.state.moviesObj.original_language}</h5>
                    </li>
                    <hr/>
                    <li>
                        <p>Overview : {this.state.moviesObj.overview}</p>
                    </li>
                    <hr/>
                    <li>
                        <h5>{this.state.moviesObj.popularity}</h5>
                    </li>
                    <hr/>
                    <li>
                        <h5>Popularity : {this.state.moviesObj.release_date}</h5>
                    </li>
                    <hr/>
                    <li>
                        <h5>Rating : {this.state.moviesObj.vote_average}</h5>
                    </li>
                </ul>

            </div>
        )
    }
}
