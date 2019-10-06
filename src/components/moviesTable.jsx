import React from 'react';
import Like from './common/like';

const MoviesTable = (props) => {
    const { movies, onDelete, onLike } = props;
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>title</th>
                    <th>genre</th>
                    <th>stock</th>
                    <th>rate</th>
                    <th>点个赞</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {movies.map(movie => (
                    <tr key={movie._id}>
                        <td>{movie.title}</td>
                        <td>{movie.genre.name}</td>
                        <td>{movie.numberInStock}</td>
                        <td>{movie.dailyRentalRate}</td>
                        <td>
                            <Like liked={movie.liked} onClick={() => onLike(movie)} />
                        </td>
                        <td>
                            <button
                                onClick={() => onDelete(movie)} className="btn btn-danger btn-sm"
                            >delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default MoviesTable;