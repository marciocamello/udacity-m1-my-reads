import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Route} from 'react-router-dom';

// Components
import NavBar from './components/NavBar';
import ShelfList from './components/ShelfList';
import SearchBooks from './components/SearchBooks';
import Loading from "./components/Loading";

// REST Api
import {getAll, search} from "./api/BooksApi";

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
            allBooks: books ? books : [],
            isLoading: false
        });
    };

    /**
     * @description Handle to receive filtered books
     * @description Callback bind from child components
     * @param filter
     * @returns {Promise<void>}
     */
    handleSearchBooks = async filter => {

        this.setState({
            isLoading: true
        });

        const books = await search(filter);

        this.setState({
            searchBooks: books ? books : [],
            isLoading: false
        });
    };

    render() {
        const {classes} = this.props;
        const {isLoading, allBooks, searchBooks} = this.state;
        return (
            <div>
                <Loading isLoading={isLoading} fixed={true}/>
                <NavBar
                    handleSearchBooks={this.handleSearchBooks}
                />
                <div className={classes.root}>
                    <Route exact path='/' render={() => (
                        <ShelfList
                            books={allBooks}
                            handleBooks={this.handleBooks}
                        />
                    )}/>
                    <Route path='/search' render={({history}) => (
                        <SearchBooks
                            books={searchBooks}
                            handleBooks={this.handleBooks}
                        />
                    )}/>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
