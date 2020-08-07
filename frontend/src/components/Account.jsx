import React, {useState, useEffect } from 'react';
import { connect } from 'react-redux'; 
import { editPassword } from '../store/actions/auth'; 
import { fetchCurrentUser, userDetails } from '../store/actions/user';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    TextField, 
    IconButton,
    Input,
    InputLabel,
    InputAdornment,
    FormControl,
    Button,
    Grid,
    FilledInput
} from '@material-ui/core';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { AiOutlineCheck } from 'react-icons/ai';
import Autocomplete from '@material-ui/lab/Autocomplete';
import swal from 'sweetalert';


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
}));

const Account = (props) => {
    const classes = useStyles();
    const [pseudonym, setPseudonym] = useState(`${props.user.pseudonym}`);    
    const [email, setEmail] = useState(`${props.user.email}`);   
    const [password, setPassword] = useState(''); 
    const [oldPassword, setOldPassword] = useState('');   
    const [showPassword, setShowPassword] = useState(false); 
    const [departementApi, setDepartementApi] = useState([]);  
    const [departement, setDepartement] = useState('01');  
    const [communeApi, setCommuneApi] = useState([]);  
    const [liveIn, setLiveIn] = useState('');    

    const changePseudo = (event) => {
      setPseudonym(event.target.value);
      };

    const changeEmail = (event) => {
    setEmail(event.target.value);
    };

    const changeDepartement = () => (event, values) => {
        setDepartement(values.code);
    };

    const changeLiveIn = () => (event, values) => {
        setLiveIn(values.nom);
    };
    const changeOldPassword = () => (event) => {
        setOldPassword(event.target.value);
    };
    
    const changePassword = () => (event) => {
        setPassword(event.target.value);
    };

    const handleClickShowPassword = () => {
    setShowPassword({showPassword: !showPassword });
    };

    const handleMouseDownPassword = (event) => {
    event.preventDefault();
    };

    useEffect(() => {
        props.fetchCurrentUser()
   }, []);

    useEffect(() => {
        getCommuneApi()
    }, [departement]);

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
        if(departement !== null && departement > 0) {
            Axios.get(`https://geo.api.gouv.fr/departements/${departement}/communes`)
        .then(response => {
            setCommuneApi(response.data);
          });
        }
    }

    const addDetails = async () => {
        const response = await props.userDetails({pseudonym, email, liveIn});
        if(response.status === 'error') {
            swal({
                title: "Oh, une erreur !",
                text: "Il semblerait qu'il y ait une erreur, avez-vous renseigné tous les champs requis ?'",
                icon: "error",
                buttons: ["Fermer"],
              });
        } else {
            props.history.push('/profil')
        }
    }
    const modifyAccount = async () => {
        const response = await props.editPassword({oldPassword, password, email});
        if(response.status === 'error') {
            swal({
                title: "Oh, une erreur !",
                text: "Avez-vous renseigné tous les champs requis ?'",
                icon: "error",
                buttons: ["Fermer"],
              });
        } else {
            props.history.push('/profil')
        }
    }
    return (
        <Container className="account">
            <div className="header">
                <h1>Gestion du compte</h1>
                <p className="subtitle">Ici, {props.user.pseudonym}, tu peux modifier tes informations</p>
            </div>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6} className="formulaires">
                    
                    <h2>Informations</h2>
                    <form className={classes.root} noValidate>
                        <TextField className="pseudo" variant="filled" label="Pseudonyme" onChange={(event) => changePseudo(event)} value={pseudonym}/>
                        <TextField className="pseudo" variant="filled" label="Email" onChange={(event) => changeEmail(event)} value={email}/>
                        <Autocomplete
                            id="dep"
                            options={departementApi}
                            getOptionLabel={(option) => option.code}
                            style={{ width: 300 }}
                            onChange={changeDepartement()} 
                            renderInput={(params) => <TextField {...params}  label="Département - O1"/>}
                        />
                        <Autocomplete
                            id="com"
                            options={communeApi}
                            getOptionLabel={(option) => option.nom}
                            style={{ width: 300 }}
                            onChange={changeLiveIn()} 
                            renderInput={(params) => <TextField {...params}  label="Commune"/>}
                        />
                    </form>
                    <Button onClick={() => addDetails()} variant="contained" className={classes.button} startIcon={<AiOutlineCheck />}> Valider </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={6} className="formulaires">
                    <h2>Compte</h2>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField className="pseudo" variant="filled" label="Email vérification" onChange={(event) => changeEmail(event)} value={email}/>
                        <FormControl className="pseudo" variant="filled">
                            <InputLabel htmlFor="oldPassword">Mot de passe actuel</InputLabel>
                            <FilledInput
                                id="OldPassword standard-required"
                                type={showPassword ? 'text' : 'password'}
                                value={oldPassword}
                                onChange={changeOldPassword('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        >
                                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl className="pseudo" variant="filled">
                            <InputLabel htmlFor="newPassword">Nouveau mot de passe</InputLabel>
                            <FilledInput
                                id="newPassword standard-required"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={changePassword('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        >
                                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </form>
                    <Button onClick={() => modifyAccount()} variant="contained" className={classes.button} startIcon={<AiOutlineCheck />}> Valider </Button>
                </Grid>
            </Grid>       
        </Container>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth.user,
    user : state.user.user
})
  
const mapDispatchToProps = {
    editPassword,
    fetchCurrentUser,
    userDetails,

}
export default connect(mapStateToProps, mapDispatchToProps)(Account)