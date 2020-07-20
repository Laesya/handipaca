import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { AiOutlineCheck } from 'react-icons/ai';

import './Style.scss'

const Api = "http://localhost:5000/api/v1/auth/signin"

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    button: {
        margin: theme.spacing(1),
    },
  }));

const Login = (props) => {
    const classes = useStyles();

    const [email, setEmail] = useState('');    
    const [password, setPassword] = useState('');    
    const [showPassword, setShowPassword] = useState(false);    
    const [isLoggedIn, setLoggedIn] = useState(false);    
    const [isError, setIsError] = useState(false);    
    const { setAuthTokens } = useAuth();

    const changeEmail = () => (event) => {
    setEmail(event.target.value);
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
      
    const auth = () => {
        Axios.post(Api, { email, password})
        .then(result => {
            if(result.status === 200) {
                console.log(result.statut)
                setAuthTokens(result.data);
                setLoggedIn(true);
            } else {
                setIsError(true);
            }
        })
        .catch(error => {
            setIsError(true);
        })
      }
      if(isLoggedIn) {
          return <Redirect to="/list"/>;
      }
  return (
    <Container className="register">
        <h1>Connexion</h1>
        <form className={classes.root} noValidate autoComplete="off">
        <TextField label="Adresse Email" onChange={changeEmail()} value={email}/>
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
          <Button onClick={auth} variant="contained" className={classes.button} startIcon={<AiOutlineCheck />}> Connexion </Button>
          <Button variant="outlined"><Link to='/register'>Créer un compte</Link></Button>
          { /*isError && <Error>L'adresse email ou le mot de passe est incorrect</Error>*/}
    </Container>
  );
}

export default Login; 