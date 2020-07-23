import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AddPlace from './participate/AddPlace';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

const Participate = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3} className="nav">
                <h1>Vous voulez participer ? C'est génial !</h1>
                <Grid item xs>
                    <p>Ajouter un nouveau lieu</p>
                </Grid>
                <Grid item xs>
                    <p>Suggérer un type de lieu</p>
                </Grid>
                <Grid item xs>
                    <p>Suggérer un type d'aménagement</p>
                </Grid>
                <Grid item xs>
                    <p>Suggérer un type de mobilité réduite</p>
                </Grid>
            </Grid>
            <AddPlace/>
        </div>
    )
}

export default Participate; 