import React, {useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { login, logout } from '../store/actions/auth';
import {  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem
  } from 'reactstrap';
import swal from 'sweetalert';


const Navigation = (props) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const toggleDrop = () => setDropdownOpen(!dropdownOpen);

  const [isParticipOpen, setIsParticipOpen] = useState(false);
  const [dropdownParticipOpen, setDropdownParticipOpen] = useState(false);
  const toggleParticip = () => setIsParticipOpen(!isParticipOpen);
  const toggleParticipDrop = () => setDropdownParticipOpen(!dropdownParticipOpen);

  const favoritesLink = (e) => {
    e.preventDefault();
    swal({
      title: "A venir !",
      text: "Vous pourrez bientôt ajouter des lieux à vos favoris et en voir la liste",
      icon: "info",
      buttons: "Fermer",
    });
  }
  const badgesLink = (e) => {
    e.preventDefault();
    swal({
      title: "A venir !",
      text: "Vous pourrez bientôt remporter des badges",
      icon: "info",
      buttons: "Fermer",
    });
  }
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
        <Dropdown nav isOpen={dropdownParticipOpen} toggle={toggleParticipDrop}>
          <DropdownToggle nav caret>
            Participer
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem><Link className="nav-link" to="/addPlace">Ajouter un lieu</Link></DropdownItem>
            <DropdownItem divider />
            <DropdownItem><Link className="nav-link" to="/suggest">Faire une suggestion</Link></DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavItem>
          <Link className="nav-link" to="/faq">F.A.Q</Link>
        </NavItem>
        <Dropdown nav isOpen={dropdownOpen} toggle={toggleDrop}>
          <DropdownToggle nav caret>
            Profil
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem><Link className="nav-link" to="/profil">Mon Profil</Link></DropdownItem>
            <DropdownItem divider />
            <DropdownItem ><Link className="nav-link" to="/account">Mon compte</Link></DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={(e) => favoritesLink(e)}>Mes favoris</DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={(e) => badgesLink(e)}>Mes badges</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavItem>
          <Link className="nav-link" to="/login" onClick={() => logOut()}>Se déconnecter</Link>
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
        <Dropdown nav isOpen={dropdownOpen} toggle={toggleDrop}>
          <DropdownToggle nav caret>
            Profil
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem><Link className="nav-link" to="/profil">Mon Profil</Link></DropdownItem>
            <DropdownItem divider />
            <DropdownItem><Link className="nav-link" to="/account">Mon compte</Link></DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={(e) => favoritesLink(e)}>Mes favoris</DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={(e) => badgesLink(e)}>Mes badges</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavItem>
          <Link className="nav-link" to="/login" onClick={() => logOut()}>Se déconnecter</Link>
        </NavItem>
      </Nav>  
    )
  }

  const renderVisitor = () => {
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
    if(props.auth.roleId === 1) {
      return (
        renderAdmin()
      )
    }else if (props.auth.roleId === 3 ) {
      return (
        renderUser()
      )
    }
  }
  
    return (
      <div>
        <Navbar light expand="md" className="navig">
          <NavbarBrand href="/">HandiPack</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar className="position">
            {!props.auth.token ? renderVisitor(): renderRole()}
          </Collapse>
        </Navbar>
      </div>      
    )
}

const mapStateToProps = (state) => ({
  auth: state.auth.user

})

const mapDispatchToProps = {
  login,
  logout
}
export default connect(mapStateToProps, mapDispatchToProps)(Navigation)