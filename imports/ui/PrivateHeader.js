import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

import { Accounts } from 'meteor/accounts-base';

// export default class PrivateHeader extends React.Component {
//     onLogout() {
//         Accounts.logout((err) => { console.log(`Logout Callback. Meteor.userId(): ${Meteor.userId()}.`, err) });
//     }

//     render() {
//         return (
//             <div>
//                 <h1>{this.props.title}</h1>
//                 <button onClick={this.onLogout.bind(this)}>Logout</button>
//             </div>
//         );
//     }
// }

const PrivateHeader = ({ title }) => {
    return (
        <div className="header">
            <div className="header__content">
                <h1 className="header__title">{title}</h1>
                <button className="button button--link-text" onClick={() => Accounts.logout() }>Logout</button>    
            </div>
        </div>
    );
};

PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired
};

export default PrivateHeader;