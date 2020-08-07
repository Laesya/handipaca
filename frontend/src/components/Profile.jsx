import React from 'react';
import { connect } from 'react-redux'; 
import { fetchCurrentUser } from '../store/actions/user';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { FaUserAlt} from 'react-icons/fa';
import { MdAccessible, MdFavorite } from 'react-icons/md';
import { AiFillHome } from 'react-icons/ai'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      overflow: 'hidden',
      padding: theme.spacing(0, 3),
    },
    paper: {
      maxWidth: 400,
      margin: `${theme.spacing(2)}px auto`,
      padding: theme.spacing(2),
    },
}));
const Profile = (props) => {
    console.log(props.user.liveIn)

    const classes = useStyles();
    return (
        <Container className="profil">
            <div className="header">
                <h1>Bonjour {props.user.pseudonym}</h1>
                <p className="subtitle">Voici un petit résumé de tes informations</p>
            </div>
            <div className={classes.root}>
            <Grid container spacing={3}>
                <Paper className={classes.paper}>
                    <Grid container wrap="wrap" spacing={2}>
                    <Grid item>
                        <Avatar><FaUserAlt/></Avatar>
                    </Grid>
                    <Grid item xs>
                        <Typography className="text">{props.user.pseudonym}, tu nous a rejoins, et ça, c'est vraiment chouette !</Typography>
                    </Grid>
                    </Grid>
                </Paper>
                <Paper className={classes.paper}>
                    <Grid container wrap="wrap" spacing={2}>
                    <Grid item>
                        <Avatar><AiFillHome/></Avatar>
                    </Grid>
                    <Grid item xs>
                        {props.user.liveIn !== null ?  <Typography>Tu habites à {props.user.liveIn}, nous te proposerons donc un maximum de lieux adaptés dans cette ville.</Typography>:  <Typography>Tu n'as pas encore précisé ton lieu de vie, tu devrais le faire dans "Mon Compte" pour qu'on puisse te proposer des lieux adaptés près de toi.</Typography>}
                    </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid container spacing={3}>
                <Paper className={classes.paper}>
                    <Grid container wrap="wrap" spacing={2}>
                    <Grid item>
                        <Avatar><MdAccessible/></Avatar>
                    </Grid>
                    <Grid item xs>
                        {props.user.hasHandicap === null ?  <Typography>Tu présente une mobilité réduite, nous te proposerons donc des lieux aménagés spécifiquements pour ce type de moblité réduite.</Typography>:  <Typography>Es-tu une personne à mobilité réduite (PMR) ? Tu devrais l'indiquer dans "Mon Compte" pour qu'on puisse te proposer des lieux adaptés à ta mobilité réduite.</Typography>}
                    </Grid>
                    </Grid>
                </Paper>
                <Paper className={classes.paper}>
                    <Grid container wrap="wrap" spacing={2}>
                    <Grid item>
                        <Avatar><MdFavorite/></Avatar>
                    </Grid>
                    <Grid item xs>
                        {props.user.hasHandicap !== null ?  <Typography>Tu as ajouté *nb* lieux dans tes favoris.</Typography>:  <Typography>Tu n'as pas encore ajouté de lieux à tes favoris, n'hésite pas à le faire pour les retrouver facilement plus tard</Typography>}
                    </Grid>
                    </Grid>
                </Paper>
            </Grid>
            </div>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    user : state.user.user
})
  
const mapDispatchToProps = {
    fetchCurrentUser,
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)