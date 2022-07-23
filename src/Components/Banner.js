import React, { Component } from 'react'
import axios from "axios";

export default class banner extends Component {

    constructor() {
        super();
        this.state = {
            allMovies: ''
        }
    }

    componentDidMount() {
        // Side Effect
        const that = this;
        axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=c25fb9d94890cb13303381c0d4aff20d&language=en-US&page=2`)
            .then(function (res) {
                let data = res.data;
                that.setState({
                    allMovies: data.results[0]
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <>
                {
                    this.state.allMovies === '' ? <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Banner...</span>
                    </div> :
                        <div className="card banner-card" >
                            <img src={`https://image.tmdb.org/t/p/original${this.state.allMovies.backdrop_path}`} className="banner-img card-img-top" alt={this.state.allMovies.title} />
                            <h1 className="card-title banner-title" >{this.state.allMovies.original_title}</h1>
                            <p className="card-text banner-text">{this.state.allMovies.overview}</p>
                        </div>
                }
            </>
        )
    }
}