import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {withStyles} from '@material-ui/core/styles';
import {Route} from 'react-router-dom';

// Components
import NavBar from './components/NavBar';
import ShelfList from './components/ShelfList';
import SearchBooks from './components/SearchBooks';
import Loading from "./components/Loading";

// REST Api
import {getAll, search} from "./api/BooksApi";

// Custom theme
const muiTheme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    /*palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#ff4400',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            light: '#0066ff',
            main: '#0044ff',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00',
        },
    },*/
    overrides: {
        MuiPaper: {
            root: {
                boxShadow: 'none'
            }
        }
    }
});

const styles = theme => ({
    root: {
        padding: 40,
        marginTop: 60
    }
});

class App extends Component {

    state = {
        isLoading: false,
        allBooks: [],
        searchBooks: [],
        filter: '',
    };

    /**
     * @description Handle to receive books
     * @description Callback bind from child components
     * @returns {Promise<void>}
     */
    handleBooks = async () => {

        this.setState({
            isLoading: true
        });

        const books = await getAll();

        this.setState({
            allBooks: books ? books : []
        });

        setTimeout(() => {
            this.setState({
                isLoading: false
            });
        }, 1000);
    };

    /**
     * @description Handle to receive filtered books
     * @description Callback bind from child components
     * @param filter
     * @returns {Promise<void>}
     */
    handleSearchBooks = async filter => {

        if(filter) {

            this.setState({
                isLoading: true,
            });

            let books = await search(filter);
            const userBooks = await getAll();

            if (books && userBooks) {
                books = books.filter(book => {
                    return !userBooks.some(b => b.id === book.id);
                });
            }

            this.setState({
                searchBooks: books ? books : [],
                filter: filter,
            });

            setTimeout(() => {
                this.setState({
                    isLoading: false
                });
            }, 1000);
        }
    };

    render() {
        const {classes} = this.props;
        const {isLoading, allBooks, searchBooks, filter} = this.state;
        return (
            <div>
                <MuiThemeProvider
                    theme={muiTheme}
                >
                    <Loading isLoading={isLoading} fixed={true}/>
                    <NavBar
                        searchBooks={searchBooks}
                        handleSearchBooks={this.handleSearchBooks}
                        filter={filter}
                    />
                    <div className={classes.root}>
                        <Route exact path='/' render={() => (
                            <ShelfList
                                books={allBooks}
                                handleBooks={this.handleBooks}
                                handleSearchBooks={this.handleSearchBooks}
                                filter={filter}
                            />
                        )}/>
                        <Route path='/search' component={({history}) => (
                            <SearchBooks
                                books={searchBooks}
                                handleBooks={this.handleBooks}
                                handleSearchBooks={this.handleSearchBooks}
                                filter={filter}
                            />
                        )}/>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
