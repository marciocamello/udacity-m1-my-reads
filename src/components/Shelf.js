import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from "@material-ui/core/Typography/Typography";

import Book from '../components/Book';

const styles = theme => ({
    root: {
        flex: 1,
    },
    divider: {
        marginBottom: 20,
        marginTop: 20
    },
    paper: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
    },
    title: {
        marginTop: 40
    }
});

/**
 * @description Shelf Component
 * @class
 */
const Shelf = props => {

    const {classes, books, title, id, handleFetchAllBooks, handleSearchBooks, filter} = props;

    return (
        <div>
            {books.length > 0 && (
                <div id={id}>
                    <Typography component="h4" variant="h4" className={classes.title}>
                        {title}
                    </Typography>
                    <Divider variant="fullWidth" className={classes.divider}/>
                    <Grid className={classes.root}>
                        <Grid item xs={12}>
                            <Grid container justify="center" spacing={24}>
                                {books.map(book => (
                                    <Grid key={book.id} item xs={12} sm={4} md={3} lg={3} xl={2}>
                                        <Book
                                            className={classes.paper}
                                            handleFetchAllBooks={handleFetchAllBooks}
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

Shelf.propTypes = {
    classes: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
    handleFetchAllBooks: PropTypes.func.isRequired,
    handleSearchBooks: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired
};

export default withStyles(styles)(Shelf);
