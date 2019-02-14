import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import {fade} from '@material-ui/core/styles/colorManipulator';
import {withStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {Link} from 'react-router-dom';
import ListItemText from '@material-ui/core/ListItemText';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import deburr from 'lodash/deburr';
import IconButton from '@material-ui/core/IconButton';
import ArrowLeftIcon from '@material-ui/icons/ArrowBack';

const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        }
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: '80%'
        }
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputRoot: {
        color: 'inherit',
        width: '100%'
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        width: '100%'
    },
    menuLink: {
        color: '#FFFFFF',
        textDecoration: 'none'
    },
    autoComplete: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
    },
    backButton: {
        marginLeft: -12,
        marginRight: 20
    }
});

// Default suggestions
const suggestions = [
    'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat',
    'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket',
    'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education',
    'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer',
    'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make',
    'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production',
    'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh',
    'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'
];

function getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {
            const keep =
                count < 5 && suggestion.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
                count += 1;
            }

            return keep;
        });
}

class NavBar extends Component {

    state = {
        term: false,
        searchInput: '',
        suggestions: []
    };

    /**
     * @description Search books and execute callback to get result in parent component
     * @description Show auto suggestions
     * @param event
     */
    onSearchBooks = event => {
        this.props.handleSearchBooks(event.target.value);
        this.setState({
            term: event.target.value,
            searchInput: event.target.value,
            suggestions: getSuggestions(event.target.value)
        });
    };

    /**
     * @description Close auto suggestions in search area
     * @description Execute callback to get result in parent component to clear result
     * @param suggestion
     */
    onRequestAutoComplete = suggestion => {
        this.props.handleSearchBooks(suggestion);
        this.setState({
            term: false,
            searchInput: suggestion,
            suggestions: [],
        });
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar>
                        {window.location.pathname === '/search' && (
                            <IconButton className={classes.backButton} color="inherit" aria-label="Menu">
                                <Link to="/" className={classes.menuLink}>
                                    <ArrowLeftIcon/>
                                </Link>
                            </IconButton>
                        )}
                        <Typography className={classes.title} variant="h4" color="inherit" noWrap>
                            <Link to="/" className={classes.menuLink}>MyReads</Link>
                        </Typography>
                        <div className={classes.grow}/>
                        {window.location.pathname === '/search' && (
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon/>
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    value={this.state.searchInput}
                                    onChange={this.onSearchBooks.bind(this)}
                                />
                                {this.state.term && (
                                    <Paper className={classes.autoComplete}>
                                        <MenuList>
                                            {this.state.suggestions.map(suggestion => (
                                                <MenuItem className={classes.menuItem} key={suggestion}>
                                                    <ListItemText
                                                        classes={{primary: classes.primary}}
                                                        inset
                                                        primary={suggestion}
                                                        onClick={() => this.onRequestAutoComplete(suggestion)}
                                                    />
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </Paper>
                                )}
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
