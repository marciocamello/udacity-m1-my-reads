import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
        color: "#FFFFFF",
        display: 'block',
        top: 'calc(50% - 40px)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        height: '100%',
        width: '100%',
        background: 'rgba(0, 0, 0, 0.75)',
        zIndex: 1000
    },
    loadingContainerFixed: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'fixed',
        height: '100%',
        width: '100%',
        background: 'rgba(0, 0, 0, 0.75)',
        zIndex: 1000
    }
});

const Loading = props => {
    const {classes, isLoading, fixed} = props;
    return (
        <div>
            {isLoading && (
                <div className={fixed ? classes.loadingContainerFixed : classes.loadingContainer}>
                    <CircularProgress className={classes.progress}/>
                </div>
            )}
        </div>
    );
};

Loading.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loading);

