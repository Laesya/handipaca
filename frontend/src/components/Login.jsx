import React, {useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    TextField,
    Button, 
    IconButton, 
    FilledInput,
    Input, 
    InputLabel, 
    InputAdornment, 
    FormControl
} from '@material-ui/core';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { AiOutlineCheck } from 'react-icons/ai';
import { connect } from 'react-redux'
import { login } from '../store/actions/auth'
import swal from 'sweetalert';

import './Style.scss'


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
    

    const log = async () => {
        const response = await props.login(email, password);
        if(response.status === 'error') {
            swal({
                title: "Oh, une erreur !",
                text: "Il semblerait que vous vous soyez trompé d'adresse mail ou de mot de passe, vous pouvez réessayer ou nous contacter afin que nous vous proposions un nouveau mot de passe",
                icon: "error",
                buttons: ["Fermer"],
              });
        } else {
            setLoggedIn(true);
        }
    }
    if(isLoggedIn) {
        return <Redirect to="/list"/>;
    }
  return (
    <Container className="register">
        <h1>Connexion</h1>
        <form className={classes.root} noValidate autoComplete="off">
            <TextField label="Adresse Email" variant="filled" onChange={changeEmail()} value={email}/>
            <FormControl className={classes.textField} variant="filled">
              <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
              <FilledInput
                id="filled-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={changePassword('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        variant="filled"
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
        </form>
          <Button onClick={log} variant="contained" className={classes.button} startIcon={<AiOutlineCheck />}> Connexion </Button>
          <Button variant="outlined"><Link to='/register'>Créer un compte</Link></Button>
    </Container>
  );
}

const mapStateToProps = (state) => ({
    auth: state.auth.user
})
  
const mapDispatchToProps = {
    login
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)