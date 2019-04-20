import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import InputBase from '@material-ui/core/InputBase';
import {fade} from '@material-ui/core/styles/colorManipulator';
import {withStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import ListItemText from '@material-ui/core/ListItemText';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import deburr from 'lodash/deburr';

const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
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
    autoComplete: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
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

class SearchInput extends Component {

    state = {
        term: false,
        searchInput: '',
        suggestions: []
    };

    componentWillUnmount() {
        document.removeEventListener('click', this.onCloseAutoComplete, true);
    }

    componentDidMount() {
        document.addEventListener('click', this.onCloseAutoComplete, true);
    }

    /**
     * @description Search books and execute callback to get result in parent component
     * @description Show auto suggestions
     * @param suggestion
     */
    onSearchBooks = suggestion => {

        this.props.handleSearchBooks(suggestion);

        this.setState({
            term: suggestion,
            searchInput: suggestion,
            suggestions: getSuggestions(suggestion)
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
            searchInput: suggestion ? suggestion : '',
            suggestions: [],
        });
    };

    /**
     * @description Close auto suggestions in search area
     * @description Execute callback to get result in parent component to clear result
     * @param suggestion
     */
    onOpenAutoComplete = suggestion => {

        if(suggestion && this.state.suggestions.length > 0) {

            this.setState({
                term: suggestion,
                searchInput: suggestion
            });
        }
    };

    /**
     * @description Update state from auto complete if click outside page
     * @param event
     */
    onCloseAutoComplete = event => {
        const domNode = ReactDOM.findDOMNode(this);

        if (event && (!domNode || !domNode.contains(event.target))) {
            this.setState({
                term: false
            });
        }
    };

    render() {

        const {classes} = this.props;

        return (
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon/>
                </div>
                <InputBase
                    id="search-input"
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    value={this.state.searchInput}
                    onChange={event => this.onSearchBooks(event.target.value)}
                    onClick={event => this.onOpenAutoComplete(event.target.value)}
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
        );
    }
}

SearchInput.propTypes = {
    classes: PropTypes.object.isRequired,
    handleSearchBooks: PropTypes.func.isRequired,
};

export default withStyles(styles)(SearchInput);
