import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export default class Login extends React.Component {
    componentWillMount() {
		// console.log('Login Component DID mount !!');
		console.log(Meteor.userId());
		if (!!Meteor.userId()) {
			this.props.history.replace('/links');
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

        console.log('submitted');

        Meteor.loginWithPassword({email}, password, (error) => {
            if(error) {
                this.setState({
                    error: 'Unable to Login. Check email and password.'
                });
            } else {
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
                    <h1>Short Lnk App</h1>
                    {/* <p>Login to your account</p> */}

                    {/* <br /> */}

                    {this.state.error ? <p>{this.state.error}</p> : undefined}

                    <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
                        <input type="email" ref="email" placeholder="E-mail" />
                        <input type="password" ref="password" placeholder="Password" />
                        <button className="button">Login</button>
                    </form>

                    {/* <br /> */}
                    <Link to="/signup">Already have an account?</Link>
                </div>

                
            </div>
        );
    }
}