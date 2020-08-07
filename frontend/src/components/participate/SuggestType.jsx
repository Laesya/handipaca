import React, {useState } from 'react';
import { connect } from 'react-redux'; 
import { createLayout } from '../../store/actions/typeOfLayout';
import { createTypePlace } from '../../store/actions/typeOfPlace';
import { createTypePMR } from '../../store/actions/typeOfHandi';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
import { AiOutlineCheck } from 'react-icons/ai';

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

const SuggestType = (props) => {
    const classes = useStyles();
    const [layoutName, setLayoutName] = useState("");  
    const [placeName, setPlaceName] = useState("");  
    const [handiName, setHandiName] = useState("");  
    const [isValid, setIsValid] = useState(false)
    const user = props.user.id

    const changeLayout = (event) => {
        setLayoutName(event.target.value);
    };
    const changePlace = (event) => {
        setPlaceName(event.target.value);
    };
    const changeHandi = (event) => {
        setHandiName(event.target.value);
    };

    const suggestLayout = async () => {
        const response = await props.createLayout({layoutName, isValid, user});
        if(response.status === 'error') {
            swal({
                title: "Oh, une erreur !",
                text: "Il semblerait qu'il y ait une erreur, avez-vous renseigné tous les champs requis ?'",
                icon: "error",
                buttons: "Fermer",
              });
        } else {
            swal({
                title: "Merci !",
                text: "Votre suggestion a été transmise aux administrateurs",
                icon: "success",
                button: "Fermer",
            });
        }
    }

    const suggestPlace = async () => {
        const response = await props.createTypePlace({placeName, isValid, user});
        if(response.status === 'error') {
            swal({
                title: "Oh, une erreur !",
                text: "Il semblerait qu'il y ait une erreur, avez-vous renseigné tous les champs requis ?'",
                icon: "error",
                buttons: "Fermer",
              });
        } else {
            swal({
                title: "Merci !",
                text: "Votre suggestion a été transmise aux administrateurs",
                icon: "success",
                button: "Fermer",
            });
        }
    }

    const suggestPMR = async () => {
        const response = await props.createTypePMR({handiName, isValid, user});
        if(response.status === 'error') {
            swal({
                title: "Oh, une erreur !",
                text: "Il semblerait qu'il y ait une erreur, avez-vous renseigné tous les champs requis ?'",
                icon: "error",
                buttons: "Fermer",
              });
        } else {
            swal({
                title: "Merci !",
                text: "Votre suggestion a été transmise aux administrateurs",
                icon: "success",
                button: "Fermer",
            });
        }
    }

    return (
        <Container className="suggest">
            <Grid item xs={12} sm={12} md={12} className="header">
                <h1>Suggérer des ajouts aux administrateurs</h1>
                <p className="subtitle">Ici, {props.user.pseudonym}, tu peux suggérer des types d'aménagements, de lieux, ou de mobilité réduite</p>
                <p className="subtitle">Tes suggestions seront visibles une fois validées par les administrateurs.</p>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4} className="formulaires">
                    <form className={classes.root} noValidate>
                        <h2>Types de lieux</h2>
                        <TextField className="inputs" variant="filled" label="Nom" onChange={(event) => changePlace(event)} value={placeName}/>
                        <Button onClick={() => suggestPlace()} variant="contained" className={classes.button} startIcon={<AiOutlineCheck />}> Valider </Button>
                    </form>
                </Grid>
                <Grid item xs={12} sm={12} md={4} className="formulaires">
                    <form className={classes.root} noValidate>
                        <h2>Types d'aménagements</h2>
                        <TextField  className="inputs" variant="filled" label="Nom" onChange={(event) => changeLayout(event)} value={layoutName}/>
                        <Button onClick={() => suggestLayout()} variant="contained" className={classes.button} startIcon={<AiOutlineCheck />}> Valider </Button>
                    </form>
                </Grid>
                <Grid item xs={12} sm={12} md={4} className="formulaires">
                    <form className={classes.root} noValidate>
                        <h2>Types de mobilité réduite</h2>
                        <TextField  className="inputs" variant="filled" label="Nom" onChange={(event) => changeHandi(event)} value={handiName}/>
                        <Button onClick={() => suggestPMR()} variant="contained" className={classes.button} startIcon={<AiOutlineCheck />}> Valider </Button>
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
    createLayout,
    createTypePlace,
    createTypePMR,
}
export default connect(mapStateToProps, mapDispatchToProps)(SuggestType)
