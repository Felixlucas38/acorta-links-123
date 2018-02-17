import React from 'react';

import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters'

export default class Links extends React.Component {
    componentWillMount() {
		console.log('Component Will mount in Links!!');
		console.log(Meteor.userId());
		//this.props.history.push('/');
		if (!Meteor.userId()) {
			this.props.history.replace('/');
		}
    }

    // onLogout() {
    //     Accounts.logout((err) => { console.log(`Logout Callback. Meteor.userId(): ${Meteor.userId()}.`, err) });
    // }
    
    // onSubmit(e) {
    //     const url = this.refs.url.value.trim();

    //     e.preventDefault();

    //     if(url) {
    //         // LinksAPI.insert({ url, userId: Meteor.userId() });
    //         Meteor.call('links.insert', url);
    //         this.refs.url.value = '';
    //     }
    // }

    render() {
        return (
            <div>
                {/* <h1>Links Component</h1>
                <button onClick={this.onLogout.bind(this)}>Logout</button> */}

                <PrivateHeader title="Your Links" />
                
                <div className="page-content">
                    <LinksListFilters />
                    <AddLink />
                    <LinksList />
                </div>
                
                {/* <p>Add Link</p>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input type="text" ref="url" placeholder="URL" />
                    <button>Add Link</button>
                </form> */}
            </div>
        );
    }
}