import React, {useState, useEffect } from 'react';
import { connect } from 'react-redux'; 
import Axios from 'axios';
import { createPlace, fetchPlaces } from '../../store/actions/place';
import {fetchLayouts} from '../../store/actions/typeOfLayout';
import {fetchTypesPlaces} from '../../store/actions/typeOfPlace';
import { fetchCurrentUser } from '../../store/actions/user';
import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';
import { AiOutlineCheck } from 'react-icons/ai';
import { Container, TextField, Grid, Button, InputLabel, MenuItem, FormControl, Select, FilledInput } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    button: {
        margin: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
}));

const noteChoice = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const AddPlace = (props) => {
    const classes = useStyles();
    
    const [name, setName] = useState('')
    const [street, setStreet] = useState('')
    const [nbStreet, setNbStreet] = useState('')
    const [city, setCity] = useState('')
    const [zip, setZip] = useState('1')
    const [note, setNote] = useState('')
    const [typeOfPlace, setTypeOfPlace] = useState('')
    const [typePlaceId, setTypePlaceId] = useState('')
    const [apiLayouts, setApiLayouts] = useState([])
    const [apiTypePlace, setApiTypePlace] = useState([])
    const [layouts, setLayouts] = useState([])
    const [departementApi, setDepartementApi] = useState([]);  
    const [communeApi, setCommuneApi] = useState([]);  

   const createPlace = async () => {
        const response = await props.createPlace({
            name: name,
            street: street,
            nbStreet: nbStreet,
            city: city,
            zip: zip,
            note: note,
            typePlaceId: typePlaceId,
            userId: props.user.id,
            layoutIds: layouts,
        })
        if(response.status === 'error') {
            swal({
                title: "Oh, une erreur !",
                text: "Avez-vous renseigné tous les champs requis ?'",
                icon: "error",
                buttons: "Fermer",
            });
        } else {
            swal({
                title: "Merci !",
                text: "Ce lieu a été ajouté à la liste des lieux accessibles'",
                icon: "success",
                buttons: "Fermer",
            });
        }
    }
    useEffect(() => {
        props.fetchCurrentUser()
   }, []);
    useEffect(() => {
        props.fetchLayouts()
        setApiLayouts(props.layouts)
    }, []);
    useEffect(() => {
        props.fetchTypesPlaces()
        setApiTypePlace(props.typePlaces)
    }, []);
    useEffect(() => {
        getCommuneApi()
    }, [zip]);

    useEffect(() => {
        getDepartement()
    }, []);
    
    async function getDepartement() {
        await Axios.get(`https://geo.api.gouv.fr/departements`)
        .then(response => {
            return setDepartementApi(response.data);
          });
    }
    const getCommuneApi = () => {
        if(zip !== null && zip > 0) {
            if (zip >= 1 && zip <= 9){
                Axios.get('https://geo.api.gouv.fr/departements/0' + zip + '/communes')
                .then(response => {
                    setCommuneApi(response.data);
                })
            } else{
                Axios.get(`https://geo.api.gouv.fr/departements/${zip}/communes`)
                .then(response => {
                    setCommuneApi(response.data);
                })
            }
        } 
    }
    const changeZip = () => (event, values) => {
        setZip(parseInt(values.code));
    };
    const changeName = (event) => {
        setName(event.target.value);
    };
    const changeStreet = (event) => {
        setStreet(event.target.value);
    };
    const changeNbStreet = (event) => {
        setNbStreet(event.target.value);
    };
    const changeCity = () => (event, values) => {
        setCity(values.nom);
    };
    const changeNote = (event) => {
        setNote(event.target.value);
    };
    const changeTypePlace = (event) => {
        setTypePlaceId(event.target.value);
    };
    const changeLayouts = (event) => {
        setLayouts(event.target.value);
    };
    return (
        <Container className="addPlace">
            <Grid item xs={12} sm={12} md={12} className="header">
                <h1>Ajouter un nouveau lieu</h1>
                <p className="subtitle">Ici, {props.user.pseudonym}, tu peux ajouter un lieu accessible aux personnes à  moblité réduite</p>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={4} className="formulaires">
                    <form className={classes.root} noValidate>
                        <FormControl className={classes.formControl} variant="filled">
                            <InputLabel id="demo-simple-select-label">Type du lieu</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={typePlaceId}
                            onChange={(event) => changeTypePlace(event)}
                            >
                                { 
                                    apiTypePlace.map((type) => {
                                        return(
                                            <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem> 
                                        )
                                    }) 
                                }
                            </Select>
                        </FormControl>
                        <Autocomplete
                            id="dep"
                            options={departementApi}
                            getOptionLabel={(option) => option.code}
                            style={{ width: 300 }}
                            onChange={changeZip()} 
                            renderInput={(params) => <TextField {...params}  label={`Département - ${zip}`}/>}
                        />
                        <Autocomplete
                            id="com"
                            options={communeApi}
                            getOptionLabel={(option) => option.nom}
                            style={{ width: 300 }}
                            onChange={changeCity()} 
                            noOptionsText='Vous devez selectionner un département'
                            renderInput={(params) => <TextField {...params}  label="Commune"/>}
                        />
                        <TextField variant="filled" label="Nom du lieu" onChange={(event) => changeName(event)} value={name}/>
                        <TextField  variant="filled" label="Rue" onChange={(event) => changeStreet(event)} value={street}/>
                        <TextField  variant="filled" label="Numéro" onChange={(event) => changeNbStreet(event)} value={nbStreet}/>
                        <FormControl className={classes.formControl} variant="filled"> 
                            <InputLabel id="demo-simple-select-label">Note</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={note}
                            onChange={(event) => changeNote(event)}
                            >
                                { 
                                    noteChoice.map((number, idx) => {
                                        return(
                                            <MenuItem key={idx} value={number}>{number}</MenuItem> 
                                        )
                                    }) 
                                }
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl} variant="filled">
                            <InputLabel id="demo-simple-select-label">Aménagements</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            multiple
                            value={layouts}
                            onChange={(event) => changeLayouts(event)}
                            >
                                { 
                                    apiLayouts.map((layout) => {
                                        return(
                                            <MenuItem key={layout.id} value={layout.id}>{layout.name}</MenuItem> 
                                        )
                                    }) 
                                }
                            </Select>
                        </FormControl>
                        <Button onClick={() => createPlace()} variant="contained" className={classes.button} startIcon={<AiOutlineCheck />}> Valider </Button>
                    </form>
                </Grid>            
            </Grid>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth.user,
    user : state.user.user,
    layouts: state.typeOfLayout.layouts,
    typePlaces: state.typeOfPlace.places,
	places: state.place.place
})
  
const mapDispatchToProps = {
    createPlace,
    fetchLayouts,
    fetchCurrentUser,
    fetchTypesPlaces,
    fetchPlaces,
}
export default connect(mapStateToProps, mapDispatchToProps)(AddPlace)