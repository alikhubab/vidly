import React, {Component} from "react";
import Like from "./common/like";
import {getMovies} from "../services/fakeMovieService";
import Pagination from "./pagination";
import {paginate} from "../utils/paginate";
import ListGroup from "./listGroup";
import {getGenres} from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash"

class Movies extends Component {
    state = {
        movies: [],
        pageSize: 4,
        currentPage: 1,
        genres: [],
        sortColumn: {path: 'title', order: 'asc'}
    };

    componentDidMount() {
        const genres = [{name: "All Genres"}, ...getGenres()]
        this.setState({movies: getMovies(), genres})
    }

    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies});
    };

    handlePageChange = page => {
        this.setState({currentPage: page})
    }

    handleLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies});
    };

    handleGenreSelect = genre => {
        this.setState({selectedGenre: genre, currentPage: 1})
    }

    handleSort = sortColumn => {

        this.setState({sortColumn})
    }

    render() {
        const {length: count} = this.state.movies;
        const {
            pageSize,
            currentPage,
            sortColumn
        } =
            this.state

        if (count === 0) return <p>There are no movies in the database.</p>;

        const {totalCount, data} = this.getPageData();
        return (
            <div className={"row"}>
                <div className="col-3">
                    <ListGroup
                        items={this.state.genres}
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect}/>
                </div>
                <div className="col">
                    <p>Showing {totalCount} movies in the database.</p>
                    <MoviesTable movies={data}
                                 sortColumn={sortColumn}
                                 onLike={this.handleLike}
                                 onSort={this.handleSort}
                                 onDelete={this.handleDelete}/>

                    <Pagination itemsCount={totalCount}
                                pageSize={pageSize}
                                onPageChange={this.handlePageChange}
                                currentPage={currentPage}/>

                </div>

            </div>
        );
    }

    getPageData() {
        const {
            pageSize,
            currentPage,
            movies: allMovies,
            selectedGenre,
            sortColumn
        } =
            this.state
        const filtered = selectedGenre && selectedGenre._id
            ? allMovies.filter(m => m.genre._id === selectedGenre._id)
            : allMovies

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

        const movies = paginate(sorted, currentPage, pageSize)
        return {totalCount: filtered.length, data: movies};
    }
}


export default Movies;
