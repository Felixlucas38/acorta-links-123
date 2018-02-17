import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { LinksAPI } from '../api/links';
import LinksListItem from './LinksListItem';

import FlipMove from 'react-flip-move';

export default class LinksList extends React.Component {
    componentDidMount() {
        // console.log('componentDidMount LinksList');
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe('links');
            const links = LinksAPI.find({
                visible: Session.get('showVisible')
            }).fetch();
            this.setState({ links });
            console.log('New Links', links);
          });
    }

    componentWillUnmount() {
        // console.log('componentWillUnmount LinksList');
        this.linksTracker.stop();
    }

    constructor(props) {
        super(props);
        this.state = {
            links: []
        };
    }

    renderLinksListItems() {
        if(this.state.links.length === 0) {
            return (
                <div className="item">
                    <p className="item__status-message">No Links found</p>
                </div>
            );
        }

        return this.state.links.map(link => {
            // <p key={link._id}>{link.url}</p>
            const shortUrl = Meteor.absoluteUrl(link._id);

            return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />;
        });
    }

    render() {
        return (
        <div>
            <div>
                <FlipMove maintainContainerHeight={true}>
                    {this.renderLinksListItems()}
                </FlipMove>
            </div>
        </div>
        );
    }
}