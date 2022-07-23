import React, { Component } from 'react'
import genreids from './genreids';

export default class Favourite extends Component {

    constructor() {
        super();
        this.state = {
            genres: [],
            currGen: 'All Genres',
            moviesArr: [],
            currText: '',
            limit: 5,
            currPage: 1
        }
    }

    handleGenreChange = (genre) => {
        this.setState({
            currGen: genre
        })
    }

    sortPopularityDesc = () => {
        let tempArr = this.state.moviesArr;
        tempArr.sort(function (objA, objB) {
            return objB.popularity - objA.popularity;
        })

        this.setState({
            moviesArr: [...tempArr]
        })
    }

    sortPopularityAsc = () => {
        let tempArr = this.state.moviesArr;
        tempArr.sort(function (objA, objB) {
            return objA.popularity - objB.popularity;
        })

        this.setState({
            moviesArr: [...tempArr]
        })
    }

    sortRatingDesc = () => {
        let tempArr = this.state.moviesArr;
        tempArr.sort(function (objA, objB) {
            return objB.vote_average - objA.vote_average;
        })

        this.setState({
            moviesArr: [...tempArr]
        })
    }

    sortRatingAsc = () => {
        let tempArr = this.state.moviesArr;
        tempArr.sort(function (objA, objB) {
            return objA.vote_average - objB.vote_average;
        })

        this.setState({
            moviesArr: [...tempArr]
        })
    }

    handleDelete = (id) => {
        let newArr = [];
        newArr = this.state.moviesArr.filter((movieObj) => movieObj.id !== id)
        this.setState({
            moviesArr: [...newArr]
        })

        localStorage.setItem("movies-app", JSON.stringify(newArr));

    }

    handlepageChange = (cPage) => {
        this.setState({
            currPage: cPage
        })
    }

    componentDidMount() {
        let tempArr = ['All Genres'];
        let data = JSON.parse(localStorage.getItem('movies-app')) || [];
        data.forEach((movieObj) => {
            if (!tempArr.includes(genreids[movieObj.genre_ids[0]])) {
                tempArr.push(genreids[movieObj.genre_ids[0]]);
            }
        })

        this.setState({
            genres: [...tempArr],
            moviesArr: [...data]
        })
    }

    render() {

        let filterArr = [];

        if (this.state.currText === '') {
            filterArr = this.state.moviesArr;
        } else {
            filterArr = this.state.moviesArr.filter((movieObj) => {
                let title = movieObj.original_title || movieObj.name || movieObj.original_title.title;
                title = title.toLowerCase();
                return title.includes(this.state.currText.toLowerCase())
            })
        }

        if (this.state.currGen !== 'All Genres') {
            filterArr = this.state.moviesArr.filter((movieObj) => {
                return genreids[movieObj.genre_ids[0]] === this.state.currGen
            });
        }

        let pagesArr = [];
        if (this.state.limit > 0) {
            let pages = Math.ceil(filterArr.length / this.state.limit);

            for (let i = 1; i <= pages; i++) {
                pagesArr.push(i);
            }


            let si = (this.state.currPage - 1) * this.state.limit;
            let ei = si + this.state.limit;

            filterArr = filterArr.slice(si, ei);
        }

        return (
            <div>
                <>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-3 col-sm-12'>
                                <ul className="list-group movies-catagory">
                                    {
                                        this.state.genres.map((genre) => (

                                            this.state.currGen === genre ?
                                                <li className="list-group-item arrow" style={{ backgroundColor: 'rgb(63,81,181)', color: 'white', fontWeight: 'bold' }}  >{genre}</li> :
                                                <li className="list-group-item arrow" styl e={{ backgroundColor: 'white', color: 'rgb(63,81,181)' }} onClick={() => this.handleGenreChange(genre)} >{genre}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className='col-lg-9 favourires-table col-sm-12'>
                                <div className='row'>
                                    <input type='text' className='input-group-text col' placeholder='Search Movie' value={this.state.currText} onChange={(e) => this.setState({ currText: e.target.value })} />
                                    <input type='number' className='input-group-text col' placeholder='Rows Count' value={this.state.limit} onChange={(e) => this.setState({ limit: e.target.value })} />
                                </div>
                                <div className='row'>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col"></th>
                                                <th scope="col">Title</th>
                                                <th scope="col">Genre</th>
                                                <th scope="col">
                                                    <i className='fas fa-sort-up' onClick={this.sortPopularityDesc} />
                                                    Popularity
                                                    <i className='fas fa-sort-down' onClick={this.sortPopularityAsc} />
                                                </th>
                                                <th scope="col">
                                                    <i className='fas fa-sort-up' onClick={this.sortRatingDesc} />
                                                    Rating
                                                    <i className='fas fa-sort-down' onClick={this.sortRatingAsc} /></th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {

                                                filterArr.map((movieObj) => (
                                                    <tr>
                                                        <td> <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} style={{ width: '5rem' }} alt={movieObj.title} /></td>
                                                        <td>
                                                            {movieObj.original_title || movieObj.name || movieObj.title}</td>
                                                        <td>{genreids[movieObj.genre_ids[0]]}</td>
                                                        <td>{movieObj.popularity}</td>
                                                        <td>{movieObj.vote_average}  </td>
                                                        <td><button type='button' className='btn btn-danger' onClick={() => this.handleDelete(movieObj.id)}>Delete</button></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <nav aria-label="Page navigation example" style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                                    <ul className="pagination">
                                        {
                                            pagesArr.map((pages) => (
                                                <li className="page-item arrow" ><a className="page-link" onClick={() => this.handlepageChange(pages)}>{pages}</a></li>
                                            ))
                                        }
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        )
    }
}

