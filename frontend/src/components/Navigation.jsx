import React, {useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import { Link } from "react-router-dom";
import {  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  } from 'reactstrap';

const Navigation = () => {
  const user = useContext(AuthContext);
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const logOut = () => {
    localStorage.clear();
    history.push('/');
    return window.location.reload();
  };

  const renderUser = () => {
    return (
      <Nav navbar className="navContaint">
        <NavItem>
          <Link className="nav-link" to="/list">La Liste</Link>
        </NavItem>
        <NavItem>
          <Link className="nav-link" to="/participate">Participer</Link>
        </NavItem>
        <NavItem>
          <Link className="nav-link" to="/faq">F.A.Q</Link>
        </NavItem>
        <NavItem>
          <Link className="nav-link" to="/list">Mon Compte</Link>
        </NavItem>
        <NavItem>
          <Link className="nav-link signin" to="/login" onClick={() => logOut()}>Se déconnecter</Link>
        </NavItem>
      </Nav>
    )
  }

  const renderAdmin = () => {
    return (
      <Nav navbar className="navContaint">
        <NavItem>
          <Link className="nav-link" to="/list">La Liste</Link>
        </NavItem>
        <NavItem>
          <Link className="nav-link" to="/participate">Participer</Link>
        </NavItem>
        <NavItem>
          <Link className="nav-link" to="/faq">F.A.Q</Link>
        </NavItem>
        <NavItem>
          <Link className="nav-link" to="/register">Administration</Link>
        </NavItem>
        <NavItem>
          <Link className="nav-link" to="/list">Mon Compte</Link>
        </NavItem>
        <NavItem>
          <Link className="nav-link signin" to="/login" onClick={() => logOut()}>Se déconnecter</Link>
        </NavItem>
      </Nav>  
    )
  }

  const renderVisitor = () => {
    console.log('VISITOR')
    return (
      <Nav navbar className="navContaint">
        <NavItem>
          <Link className="nav-link" to="/list">La Liste</Link>
        </NavItem>
        <NavItem>
          <Link className="nav-link" to="/faq">F.A.Q</Link>
        </NavItem>
        <NavItem>
          <Link className="nav-link signin" to="/login">Se connecter</Link>
        </NavItem>
        <NavItem>
          <Link className="nav-link signup" to="/register" >S'inscrire</Link>
        </NavItem>
      </Nav>
    )
  }

  const renderRole = () => {
    console.log(user.authTokens.user.roleId,'user.authTokens')
    if( user.authTokens.user.roleId === 1) {
    console.log('ADMIN')
      return (
        renderAdmin()
      )
    }else if (user.authTokens.user.roleId === 3 ) {
    console.log('USER')
      return (
        renderUser()
      )
    }
  }


console.log(user)
    return (
      <div>
        <Navbar light expand="md" className="navig">
          <NavbarBrand href="/">HandiPack</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar className="position">
            {!user.authTokens ? renderVisitor() : renderRole()}
          </Collapse>
        </Navbar>
      </div>      
    )
}

export default Navigation;