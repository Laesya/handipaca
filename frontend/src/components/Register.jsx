import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { signUp } from '../store/actions/auth'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { AiOutlineCheck } from 'react-icons/ai';
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

const Register = (props) => {
    const classes = useStyles();
    const [pseudonym, setPseudonym] = useState('');    
    const [email, setEmail] = useState('');    
    const [password, setPassword] = useState('');    
    const [showPassword, setShowPassword] = useState(false);    
    const [isRegisterIn, setRegisterIn] = useState(false);    

    const changePseudo = () => (event) => {
      setPseudonym(event.target.value);
      };

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
    
    const auth = async () => {
      console.log(pseudonym, email, password)
      const response = await props.signUp({email, password, pseudonym});
      if(response.status === 'error') {
          swal({
              title: "Oh, une erreur !",
              text: "Il semblerait qu'il y ait une erreur, avez-vous renseigné tous les champs requis ?'",
              icon: "error",
              buttons: ["Fermer"],
            });
      } else {
        setRegisterIn(true);
      }
  }
  if(isRegisterIn) {
      return <Redirect to="/login"/>;
  }
  return (
    <Container className="register">
        <h1>Bienvenue</h1>
        <form className={classes.root} noValidate autoComplete="off">
        <TextField label="Pseudonyme" onChange={changePseudo()} value={pseudonym}/>
        <TextField  label="Adresse Email" onChange={changeEmail()} value={email}/>
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
          <Button onClick={auth} variant="contained" className={classes.button} startIcon={<AiOutlineCheck />}> Valider </Button>
          <Button variant="outlined"><Link to='/login'>Déjà inscrit ? </Link></Button>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth.user
})

const mapDispatchToProps = {
  signUp
}
export default connect(mapStateToProps, mapDispatchToProps)(Register)