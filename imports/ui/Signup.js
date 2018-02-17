import { Meteor } from 'meteor/meteor';

import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';


export default class Signup extends React.Component {
    componentWillMount() {
		// console.log('Component Will mount in Signup!!');
		console.log(Meteor.userId());
		//this.props.history.push('/');
		if (!!Meteor.userId()) {
			this.props.history.replace('/links')
		}
	}

    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
    }
    
    onSubmit(e) {
        e.preventDefault();

        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

        if(password.length < 9) {
            return this.setState({ error: 'Password must be more than 8 characters long.' });
        }

        Accounts.createUser({ email, password }, (error) => {
            if(error) {
                console.log(`Error: ${error}`);
                this.setState({
                    error: `Error creating user. ${error.reason}`
                });
            } else {
                console.log(`Success. UserId(): ${Meteor.userId()}`);
                this.setState({
                    error: ''
                });
            }
        });
    }

    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Join Short Lnk</h1>
                    {/* <p>Create your account</p> */}

                    {/* <br /> */}

                    {this.state.error ? <p>{this.state.error}</p> : undefined}

                    <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
                        <input type="email" ref="email" placeholder="E-mail" />
                        <input type="password" ref="password" placeholder="Password" />
                        <button className="button">Create Account</button>
                    </form>

                    {/* <br /> */}
                    <Link to="/">Already have an account?</Link>
                </div>
            </div>
        );
    }
}