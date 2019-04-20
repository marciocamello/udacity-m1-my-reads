import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ArrowLeftIcon from '@material-ui/icons/ArrowBack';
import SearchInput from "./SearchInput";

const styles = theme => ({
    root: {
        width: '100%',
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        }
    },
    menuLink: {
        color: '#FFFFFF',
        textDecoration: 'none'
    },
    backButton: {
        marginLeft: -12,
        marginRight: 20
    }
});

const NavBar = props => {

    const {classes, handleSearchBooks, searchBooks, filter} = props;

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
                        <SearchInput
                            searchBooks={searchBooks}
                            handleSearchBooks={handleSearchBooks}
                            filter={filter}
                        />
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
    handleSearchBooks: PropTypes.func.isRequired,
    searchBooks: PropTypes.array.isRequired,
    filter: PropTypes.string.isRequired
};

export default withStyles(styles)(NavBar);
