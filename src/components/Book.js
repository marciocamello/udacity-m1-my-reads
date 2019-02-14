import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import {update} from "../api/BooksApi";
import Loading from "./Loading";

const styles = theme => ({
    card: {
        position: 'relative',
    },
    cardDisabled: {
        position: 'relative',
        pointerEvents: 'none'
    },
    media: {
        height: 250,
    },
    content: {
        height: 150
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    }
});

class Book extends Component {

    state = {
        isLoading: false,
        optionOpen: null,
        options: [
            {
                id: 'currentlyReading',
                name: 'Currently Reading'
            },
            {
                id: 'wantToRead',
                name: 'Want to Read'
            },
            {
                id: 'read',
                name: 'Read'
            },
            {
                id: 'none',
                name: 'None'
            }
        ]
    };

    onOpenOptionMenu = event => {
        this.setState({
            optionOpen: event.currentTarget
        });
    };

    onCloseOptionMenu = () => {
        this.setState({
            optionOpen: null
        });
    };

    /**
     * @description Change a shelf option and update state
     * @description After update state, execute callback to refresh all books
     * @param book
     * @param shelf
     * @returns {Promise<void>}
     */
    onUpdateBookFromShelf = async (book, shelf) => {

        this.setState({
            isLoading: true
        });

        await update(book, shelf);

        this.setState({
            optionSelected: shelf.toString(),
            isLoading: false,
            optionOpen: null
        });

        this.props.handleFetchAllBooks();
    };

    /**
     * @description Get shelf status name
     * @param shelf
     * @returns {string}
     */
    getShelfStatusName = shelf => {
        const s = this.state.options.find(s => s.id === shelf);
        return s ? s.name : 'none';
    };

    render() {

        const {classes, book} = this.props;
        const {optionOpen, options} = this.state;

        return (
            <Card className={this.state.isLoading ? classes.cardDisabled : classes.card}>
                <Loading isLoading={this.state.isLoading}/>
                <CardMedia
                    className={classes.media}
                    image={book.imageLinks ? book.imageLinks.thumbnail : 'http://via.placeholder.com/300'}
                    title={book.title}
                />
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {book.title}
                    </Typography>
                    {book.authors && book.authors.length > 0 && book.authors.map(author => (
                        <Typography variant="subtitle1" color="textSecondary" key={author}>
                            {author} {book.shelf}
                        </Typography>
                    ))}
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                    <Button
                        className={classes.expand}
                        aria-haspopup="true"
                        onClick={this.onOpenOptionMenu}
                        variant="contained"
                        color="secondary"
                    >
                        {this.getShelfStatusName(book.shelf)}<MoreVertIcon/>
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={optionOpen}
                        open={Boolean(optionOpen)}
                        onClick={() => this.onCloseOptionMenu()}
                    >
                        {options.map(option => {

                            book.shelf = book.shelf ? book.shelf : 'none';

                            let s;
                            s = book.shelf === option.id;

                            return <MenuItem
                                key={option.id}
                                onClick={() => s ? {} : this.onUpdateBookFromShelf(book, option.id)}
                                selected={s}
                                value={option.shelf}
                            >
                                {option.name}
                            </MenuItem>
                        })}
                    </Menu>
                </CardActions>
            </Card>
        );
    }
}

Book.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Book);
