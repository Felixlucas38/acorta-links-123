import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

import { LinksAPI } from '../api/links';

export default class AddLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            isOpen: false,
            error: ''
        };
    }

    onSubmit(e) {
        // const url = this.refs.url.value.trim();
        const { url } = this.state;

        e.preventDefault();

        // LinksAPI.insert({ url, userId: Meteor.userId() });
        Meteor.call('links.insert', url, (err, res) => {
            if (!err) {
                this.handleModalClose();
            } else {
                this.setState({ error: err.reason });
            }
        });
    }

    onChange(e) {
        this.setState({ url: e.target.value.trim() });
    }

    handleModalClose() {
        this.setState({ url: '', isOpen: false, error: '' })
    }

    render() {
        return (
            <div>
                <button className="button" onClick={() => this.setState({ isOpen: true })}>+ Add Link</button>

                <Modal
                isOpen={this.state.isOpen}
                contentLabel="Add Link"
                ariaHideApp={false}
                onAfterOpen={() => this.refs.url.focus()}
                onRequestClose={this.handleModalClose.bind(this)}
                className="boxed-view__box"
                overlayClassName="boxed-view boxed-view--modal" >
                    <h1>Add Link</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)}>
                        <input
                        type="text"
                        placeholder="URL"
                        ref="url"
                        value={this.state.url}
                        onChange={this.onChange.bind(this)} />
                        <button className="button">Add Link</button>
                        <button className="button button--secondary" type="button" onClick={this.handleModalClose.bind(this)}>Cancel</button>
                    </form>
                    
                </Modal>
            </div>
        );
    }
}