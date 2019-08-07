import React from 'react';
import GameRoom from './GameRoom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';


const styles = theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 600,
        margin: '0 auto',
        textAlign: 'center',
    },
});

class PickRoom extends React.Component {
    constructor(props) {
        super(props);

        this.selectedRoomName = this.sendSelectedRoom.bind(this);
    }

    sendSelectedRoom(roomName) {
        console.log(roomName);
    }

    renderRoom(room) {
        const { classes } = this.props;
        return (
            <Grid item xs={4} key={room.name} >
                <ButtonBase
                    onClick={() => this.sendSelectedRoom(room.name)}
                >
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {room.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {room.count} users in room
                    </Typography>
                    </CardContent>
                </Card>
                    </ButtonBase>
            </Grid>
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid
                container
                spacing={2}
                alignItems="center"
                justify="center"
                className={classes.root}>

                <Grid item xs={12}>
                    <h1>Pick A Room</h1>
                </Grid>

                {this.props.rooms.map(x => this.renderRoom(x))}
            </Grid>
        );
    }
}

PickRoom.propTypes = {
    classes: PropTypes.object.isRequired,
    rooms: PropTypes.array.isRequired,
    socket: PropTypes.object.isRequired,
};

export default withStyles(styles)(PickRoom);
