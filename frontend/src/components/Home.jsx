import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/auth';

const Home = () => {
    const user = useContext(AuthContext);
    const history = useHistory();
    return (
        <div>je suis la home page</div>
    )
}

export default Home; 