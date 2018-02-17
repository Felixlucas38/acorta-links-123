import { Meteor } from 'meteor/meteor';
import React from 'react';
import {
    Router,
    Route,
    Switch,
    Link
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Login from '../ui/Login';
import Signup from '../ui/Signup';
import Links from '../ui/Links';
import URLParameters from '../ui/URLParameters';
import ParameterChild from '../ui/ParameterChild';
import NotFound from '../ui/NotFound';

// Utilizando la librería 'history' de npm para react router, creo un objeto history para utilizar con Router.
// De ésta manera puedo aplicar el onAuthChange de una forma simplista, como lo hace Andrew Mead.
const history = createBrowserHistory();

// Arrays de páginas publicas y privadas para utilizar en el auth tracker
const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

export const onAuthChange = (isAuthenticated) => {
    console.log('isAuthenticated', isAuthenticated);

    // Ubicación actual. Nombre del path actual
    const pathname = history.location.pathname;

    console.log(pathname);
    console.log(authenticatedPages.includes(pathname));
    
    if(isAuthenticated && unauthenticatedPages.includes(pathname)) {
        // Si está autenticado y está en una página de no-autenticados (Ej: login), redirigir a links, que sería como el Dashboard
        console.log('replacing with /links');
		return history.replace('/links');
    } else if(!isAuthenticated && authenticatedPages.includes(pathname)) {
        // Si no está autenticado y está en una página de autenticados, redirigir a Login.
        console.log('replacing with /');
		return history.replace('/');
    }
}

export const routes = (
    <Router history={ history }>
        <div>
            {/* ELEMENTOS COMUNES */}
            {/* <div>Here will go User Info and Login Status</div>
            <ul>
                <li><Link to="/">(root) /</Link></li>
                <li><Link to="/signup">/signup</Link></li>
                <li><Link to="/links">/links</Link></li>
                <li><Link to="/urlparameters">/urlparameters</Link></li>
                <li><Link to="/dgsjdfgksjgf">(NotFound) /dgsjdfgksjgf</Link></li>
            </ul> */}
            
            {/* FIN ELEMENTOS COMUNES */}

            {/* <br /><br />
            <hr />
            <br /><br /> */}

            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/links" component={Links}/>
                {/* <Route exact path="/urlparameters" component={URLParameters} /> */}
                {/* <Route path="/urlparameters/:paramsId" component={ParameterChild} /> */}
                {/* <Redirect from="/urlparameters" to="/urlparameters" /> */}
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
);
