import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 600,
        margin: '0 auto',
        textAlign: 'center',
    },
    input: {
        width: 300
    },
    center: {
        align: 'center',
        margin: '0 auto',
    },
    headline: {
        color: 'black'
    },
});

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Heisenberg'
        };
    }

    handleChange(event) {
        this.setState({ name: event.target.value });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid
                    container
                    spacing={4}
                    alignItems="center"
                    justify="center"
                    className={classes.root}>

                    <Grid item>
                        <h1 className={classes.headline}>Play Mau Now</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className={classes.input}
                            variant="outlined"
                            placeholder="Username"
                            onChange={(event) => this.props.changePlayerName(event.target.value)} />
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={6}>
                            <Button size="lg" onClick={()=>this.props.pickRoom()}>Join a game</Button>
                        </Grid>
                        <Grid item xs={6} container alignItems="center">
                            <Button size="lg" onClick={()=>this.props.createRoom()}>Create a game</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
    changePage: PropTypes.func.isRequired,
    changePlayerName: PropTypes.func.isRequired,
    createRoom: PropTypes.func.isRequired,
    pickRoom: PropTypes.func.isRequired,
};

export default withStyles(styles)(HomePage);
