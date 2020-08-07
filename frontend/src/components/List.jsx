import React, {useState, useEffect } from 'react';
import { connect } from 'react-redux'; 
import { Link, Redirect } from 'react-router-dom';
import { fetchPlaces } from '../store/actions/place';
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardHeader, CardContent, CardActions, Avatar, IconButton,Divider, Button} from '@material-ui/core';
import { AiFillHeart } from 'react-icons/ai';
import {  RiAddCircleLine } from 'react-icons/ri';
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    avatar: {
      backgroundColor: '#A09284',
    },
}));

const List = (props) => {
    const [apiPlaces, setApiPlaces] = useState([])
    const [love, setLove] = useState(false)
    const [active, setActive] = useState(false)
    const classes = useStyles();

  
    useEffect(() => {
        props.fetchPlaces()
        setApiPlaces(props.places)
    }, []);

    const addFavorites = (event, idx) => {
        event.preventDefault()
        //setActive(!active);
        //setLove(!love)
        swal({
            title: "A venir !",
            text: "Vous pourrez bientôt ajouter des lieux à vos favoris",
            icon: "info",
            buttons: "Fermer",
          });
    }
    return (
        <div className="list">
            { 
                apiPlaces.map((place, idx) => {
                    return(
                        <Card key={place.id} className={classes.root}>
                            <CardHeader
                                avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    {place.note}/10
                                </Avatar>
                                }
                                title={place.type.name}                                   
                            />
                            <Divider />
                            <CardContent>
                                <p className="title">{place.name}</p>
                                <p className="adress">{place.nbStreet + ' ' + place.street + ' à ' + place.city}</p>
                                <div className="action">
                                    <Button disabled variant="contained" className={classes.button}>Voir sur la carte</Button>
                                    <Button disabled variant="contained" className={classes.button}> <Link to='/login'>En savoir plus</Link></Button>
                                </div>
                            </CardContent>
                            <Divider />
                            <CardActions >
                                <IconButton className={active && love ? "love": "MuiIconButton-root"} onClick={(event) => addFavorites(event, idx)} aria-label="add to favorites">
                                <AiFillHeart />
                                </IconButton>
                            </CardActions>
                        </Card>
                    )
                }) 
            }
    
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth.user,
    user : state.user.user,
	places: state.place.places
})
  
const mapDispatchToProps = {
    fetchPlaces,
}
export default connect(mapStateToProps, mapDispatchToProps)(List)