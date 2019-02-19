import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography/Typography";
import Divider from "@material-ui/core/Divider/Divider";
import Grid from "@material-ui/core/Grid/Grid";
import Book from "./Book";

const styles = theme => ({
    root: {
        padding: 40
    },
    divider: {
        marginBottom: 20,
        marginTop: 20
    },
    paper: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary
    }
});

const SearchBooks = props => {

    const {classes, books, handleBooks, handleSearchBooks, filter} = props;

    return (
        <div id="search-book-container">
            <Typography component="h4" variant="h4">
                Search Books
            </Typography>
            <Divider variant="fullWidth" className={classes.divider}/>
            {books.length > 0 && (
                <div>
                    <Grid container className={classes.root} spacing={16}>
                        <Grid item xs={12}>
                            <Grid container spacing={24}>
                                {books.map(book => (
                                    <Grid key={book.id} item xs={12} md={4} lg={2}>
                                        <Book
                                            className={classes.paper}
                                            handleFetchAllBooks={handleBooks}
                                            handleSearchBooks={handleSearchBooks}
                                            filter={filter}
                                            book={book}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            )}
        </div>
    );
};

SearchBooks.propTypes = {
    classes: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    handleBooks: PropTypes.func.isRequired,
    handleSearchBooks: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired
};

export default withStyles(styles)(SearchBooks);
