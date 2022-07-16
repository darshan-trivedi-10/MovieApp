import React, { Component } from 'react'
import axios from 'axios';

export default class Movies extends Component {
    constructor() {
        super();
        this.state = {
            hover: '',
            parr: [1],
            currPage: 1,
            allMovies: []
        }
    }

    componentDidMount() {

        // Side Effect
        const that = this;
        axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=c25fb9d94890cb13303381c0d4aff20d&language=en-US&page=${this.state.currPage}`)
            .then(function (res) {
                let data = res.data;
                that.setState({
                    allMovies: [...data.results]
                })

            })
            .catch(function (error) {
                console.log(error);
            })
    }

    pageChange = async () => {
        const res = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=c25fb9d94890cb13303381c0d4aff20d&language=en-US&page=${this.state.currPage}`);
        let data = res.data;
        this.setState({
            allMovies: [...data.results]
        })
    }

    handlenext = () => {
        let len = this.state.parr.length + 1;
        let tempArr = [];
        for (let i = 1; i <= len; i++) {
            tempArr.push(i);
        }

        this.setState({
            parr: [...tempArr],
            currPage: this.state.currPage + 1
        }, this.pageChange)

    }

    handleprevious = () => {
        if (this.state.currPage !== 1) {
            this.setState({
                currPage: this.state.currPage - 1
            }, this.pageChange)
        }
    }

    handlebtn = (value) => {
        if (value !== this.state.currPage) {
            this.setState({
                currPage: value
            }, this.pageChange)
        }

    }

    render() {
        // let allMovies = movies.results;
        return (
            <>
                {
                    this.state.allMovies.length === 0 ? <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div> :
                        <div>
                            <h3 className='text-center'><strong>Trending</strong></h3>
                            <div className='movies-list'>
                                {
                                    this.state.allMovies.map((movieObj) => (
                                        <div className="card movies-card" onMouseEnter={() => this.setState({ hover: movieObj.id })} onMouseLeave={() => this.setState({ hover: '' })} >
                                            <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="movies-img card-img-top" alt={movieObj.title} />
                                            {/* <div className="card-body"> */}
                                            <h5 className="card-title movies-title" >{movieObj.original_title}</h5>
                                            {/* <p className="card-text movies-text">{movieObj.overview}</p> */}
                                            <div className='movie-btn-wrapper'>
                                                {
                                                    this.state.hover === movieObj.id && <a className="btn btn-primary movies-btn">Add to Favourites</a>
                                                }
                                            </div>
                                            {/* </div> */}
                                        </div>
                                    ))
                                }</div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className="page-item arrow"><a className="page-link" onClick={this.handleprevious}>Previous</a></li>
                                        {
                                            this.state.parr.map((value) => (
                                                <li className="page-item arrow"><a className="page-link" onClick={() => this.handlebtn(value)}>{value}</a></li>
                                            ))
                                        }
                                        <li className="page-item arrow"><a className="page-link" onClick={this.handlenext}>Next</a></li>
                                    </ul>
                                </nav>
                            </div>


                        </div>
                }
            </>
        )
    }
}
