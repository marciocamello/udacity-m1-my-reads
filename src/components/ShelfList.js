import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Shelf from '../components/Shelf';
import {Link} from "react-router-dom";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    root: {
        padding: 40
    },
    fab: {
        margin: theme.spacing.unit,
        position: 'fixed',
        bottom: 10,
        right: 10
    },
});

class ShelfList extends Component {

    /**
     * @description Execute callback to update all books
     */
    componentDidMount() {
        this.props.handleBooks(false);
    }

    /**
     * @description Add closure to better functionality
     * @param books
     * @returns {function(*): *}
     */
    filter = books => shelf => books.filter(b => b.shelf === shelf);

    render() {

        const {classes, handleSearchBooks, filter} = this.props;

        // Filter using closure
        const filterBy = this.filter(this.props.books);

        // Filter books currently reading books
        const booksCurrentlyReading = filterBy('currentlyReading');

        // Filter books want to read
        const booksWantToRead = filterBy('wantToRead');

        // Filter books read
        const booksRead = filterBy('read');

        return (
            <div>
                <Shelf books={booksCurrentlyReading}
                       title="Currently Reading"
                       id="currentlyReading"
                       handleFetchAllBooks={this.props.handleBooks.bind(this)}
                       handleSearchBooks={handleSearchBooks}
                       filter={filter}
                />
                <Shelf books={booksWantToRead}
                       title="Want To Read"
                       id="wantToRead"
                       handleFetchAllBooks={this.props.handleBooks.bind(this)}
                       handleSearchBooks={handleSearchBooks}
                       filter={filter}
                />
                <Shelf books={booksRead}
                       title="Read"
                       id="read"
                       handleFetchAllBooks={this.props.handleBooks.bind(this)}
                       handleSearchBooks={handleSearchBooks}
                       filter={filter}
                />
                <Link to="/search">
                    <Fab id="search-link" color="primary" aria-label="Add" className={classes.fab}>
                        <AddIcon/>
                    </Fab>
                </Link>
            </div>

        );
    }
}

ShelfList.propTypes = {
    classes: PropTypes.object.isRequired,
    handleSearchBooks: PropTypes.func.isRequired,
    handleBooks: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired
};

export default withStyles(styles)(ShelfList);
