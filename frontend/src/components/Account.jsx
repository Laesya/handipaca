import React, {useState, useEffect } from 'react';
import { connect } from 'react-redux'; 
import { editPassword } from '../store/actions/auth'; 
import { fetchCurrentUser } from '../store/actions/user';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { AiOutlineCheck } from 'react-icons/ai';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';


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
    const [pseudonym, setPseudonym] = useState('');    
    const [email, setEmail] = useState('');   
    const [password, setPassword] = useState('');    
    const [showPassword, setShowPassword] = useState(false); 
    const [departementApi, setDepartementApi] = useState([]);  
    const [departement, setDepartement] = useState('01');  
    const [communeApi, setCommuneApi] = useState([]);  
    const [liveIn, setLiveIn] = useState('');    
    const [hasHandicap, setHasHandicap] = useState(false);   
    const [zip, setZip] = useState(null); 

    const changePseudo = (event) => {
      setPseudonym(event.target.value);
      };

    const changeEmail = () => (event) => {
    setEmail(event.target.value);
    };

    const changeDepartement = () => (event, values) => {
        console.log(values)
        setDepartement(values.code);
    };

    const changeLiveIn = () => (event, values) => {
        setLiveIn(values.nom);
    };

    const changeHasHandicap = () => (event) => {
        setHasHandicap(event.target.value);
    };

    const changeZip = () => (event) => {
        setZip(event.target.value);
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
        if(departement !== null && departement !== 0) {
            Axios.get(`https://geo.api.gouv.fr/departements/${departement}/communes`)
        .then(response => {
            setCommuneApi(response.data);
          });
        }
    }
    return (
        <Container className="account">
            <div className="header">
                <h1>Gestion du compte</h1>
                <p className="subtitle">Ici, {props.user.pseudonym}, tu peux gérer ton profil et modifier tes informations</p>
            </div>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6} className="formulaires">
                    <h2>Informations</h2>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField className="pseudo" label="Pseudonyme" onChange={(event) => changePseudo(event)} value={pseudonym}/>
                        <Autocomplete
                            id="dep"
                            options={departementApi}
                            getOptionLabel={(option) => option.code}
                            style={{ width: 300 }}
                            onChange={changeDepartement()} 
                            renderInput={(params) => <TextField {...params}  label="Département"/>}
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
                </Grid>
                <Grid item xs={12} sm={12} md={6} className="formulaires">
                    <h2>Compte</h2>
                    <form className={classes.root} noValidate autoComplete="off">

                    <TextField label="Email" onChange={(event) => changeEmail(event)} value={email}/>
                    <FormControl >
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password standard-required"
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
    fetchCurrentUser
}
export default connect(mapStateToProps, mapDispatchToProps)(Account)