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
    }
});

/**
 * @description Shelf Component
 * @class
 */
const Shelf = props => {
    const {classes, books, title, handleFetchAllBooks} = props;
    return (
        <div>
            {books.length > 0 && (
                <div id={title}>
                    <Typography component="h4" variant="h4">
                        {title}
                    </Typography>
                    <Divider variant="fullWidth" className={classes.divider}/>
                    <Grid container className={classes.root} spacing={16}>
                        <Grid item xs={12}>
                            <Grid container justify="center" spacing={24}>
                                {books.map(book => (
                                    <Grid key={book.id} item xs={12} md={4} lg={4}>
                                        <Book
                                            className={classes.paper}
                                            handleFetchAllBooks={handleFetchAllBooks}
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
};

export default withStyles(styles)(Shelf);
