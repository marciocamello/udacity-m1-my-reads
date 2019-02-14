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

    render() {

        const {classes, books} = this.props;

        // Filter books currently reading books
        const booksCurrentlyReading = books.filter(book => book.shelf === 'currentlyReading');

        // Filter books want to read
        const booksWantToRead = books.filter(book => book.shelf === 'wantToRead');

        // Filter books read
        const booksRead = books.filter(book => book.shelf === 'read');

        return (
            <div>
                <Shelf books={booksCurrentlyReading} title="Currently Reading"
                       handleFetchAllBooks={this.props.handleBooks.bind(this)}/>
                <Shelf books={booksWantToRead} title="Want To Read"
                       handleFetchAllBooks={this.props.handleBooks.bind(this)}/>
                <Shelf books={booksRead} title="Read"
                       handleFetchAllBooks={this.props.handleBooks.bind(this)}/>
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
};

export default withStyles(styles)(ShelfList);
