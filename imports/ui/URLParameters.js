import React from 'react';
import { Switch, Redirect, Link } from 'react-router-dom';

import ParameterChild from './ParameterChild.js';

export default class URLParameters extends React.Component {
    render() {
        return (
            <div>
                <h1>URLParameters Component</h1>

                <ul>
                    <li><Link to={`${this.props.match.url}/Yahoo`}>Yahoo</Link></li>
                    <li><Link to={`${this.props.match.url}/Perro`}>Perro</Link></li>
                    <li><Link to={`${this.props.match.url}/DarkSouls`}>DarkSouls</Link></li>
                    <li><Link to={`${this.props.match.url}/SOAD`}>SOAD</Link></li>
                    <li><Link to={`${this.props.match.url}/Kakaroto`}>Kakaroto</Link></li>
                </ul>

            </div>
        );
    }
}