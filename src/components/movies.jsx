import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './common/pagination';
import { paginate, pageinate } from '../utils/paginate';
import ListGroup from './common/listgroup';
import { getGenres } from '../services//fakeGenreService';
import MoviesTable from './moviesTable';

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4
    }

    componentDidMount() {
        this.setState({ movies: getMovies(), genres: getGenres() });
    }

    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies });
    }
    // 点赞
    handleLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    }
    // 分页
    handlePageChange = page => {
        this.setState({ currentPage: page });
    }
    // 筛选
    handleGenreSelect = genre => {
        this.setState({ selectedGenre: genre });
    }
    render() {
        const { length: count } = this.state.movies;
        const {
            pageSize,
            currentPage,
            selectedGenre,
            movies: allMovies
        } = this.state;

        // 筛选功能
        const filtered = selectedGenre ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;

        const movies = pageinate(filtered, currentPage, pageSize);

        return (
            <div className="row">
                <div className="col-3">
                    <ListGroup
                        items={this.state.genres}
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    />
                </div>
                <div className="col">
                    <MoviesTable
                        movies={movies}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                    />
                    <Pagination 
                        itemsCount={filtered.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            </div>
        );
    }
}

export default Movies;