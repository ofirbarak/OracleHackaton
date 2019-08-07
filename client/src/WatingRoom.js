import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Button from 'react-bootstrap/Button';

const styles = theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 600,
        margin: '0 auto',
        textAlign: 'center',
    },
    avatar: {
        margin: 10,
        fontSize: 40,
        height: 100,
        width: 100,
        color: '#fff',
        backgroundColor: deepOrange[500],
    },
});

class WatingRoom extends React.Component {
    constructor(props) {
        super(props);

        this.letsPlay = this.letsPlay.bind(this);
    }

    letsPlay(){
        console.log('ready to play');
    }

    renderUser(user) {
        const { classes } = this.props;
        return (
            <Avatar className={classes.avatar}>user</Avatar>
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid
                container
                spacing={4}
                alignItems="center"
                justify="center"
                className={classes.root}>

                <Grid item xs={12}>
                    <h1>Let's Play</h1>
                </Grid>

                {this.props.room_users.map(x => this.renderUser(x))}

                <Grid item xs={12}>
                    <Button size="lg" onClick={() => this.letsPlay()}>I'm ready to play</Button>
                </Grid>
            </Grid>
        );
    }
}

WatingRoom.propTypes = {
    classes: PropTypes.object.isRequired,
    room_users: PropTypes.array.isRequired,
    socket: PropTypes.object.isRequired,
};

export default withStyles(styles)(WatingRoom);
