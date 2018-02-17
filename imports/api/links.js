import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const LinksAPI = new Mongo.Collection('links');

if(Meteor.isServer) {
    Meteor.publish('links', function () {
        // Para poder acceder al userId tuvimos que cambiar la función a una clásica de ES5, siendo anteriormente una arrow-function
        // Con este acercamiento tuvimos acceso a userId a traves de this. Es necesario investigar cómo fue posible esto.
        return LinksAPI.find({ userId: this.userId });
    });
}

Meteor.methods({
    'links.insert'(url) {
        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        new SimpleSchema({
            url: {
            type: String,
            label: 'Your link',
            regEx: SimpleSchema.RegEx.Url
            }
        }).validate({ url });

        LinksAPI.insert({
            _id: shortid.generate(),
            url,
            userId: this.userId,
            visible: true,
            visitedCount: 0,
            lastVisitedAt: null
        });
    },
    'links.setVisibility'(_id, visible) {
        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            },
            visible: {
                type: Boolean
            }
        }).validate({ _id, visible });// ES6 Syntax

        LinksAPI.update({
            _id,
            userId: this.userId
        }, { $set: { visible } });
    },
    'links.trackVisit'(_id) {
        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            }
        }).validate({ _id });// ES6 Syntax

        LinksAPI.update({ _id }, {
            $set:{ lastVisitedAt: new Date().getTime() },
            $inc: { visitedCount: 1 }
        });
    }
    // greetUser(name) {
    //     console.log('greetUser running');

    //     if(!name) {
    //         throw new Meteor.Error('invalid-arguments', 'Name is required');
    //     }

    //     return `Hello ${name}!`;
    // },

    // addNumbers(number1, number2) {
    //     if(typeof number1 !== 'number' || typeof number2 !== 'number') {
    //         throw new Meteor.Error('invalid-arguments', 'Arguments must be numbers');
    //     }

    //     return number1 + number2;
    // }
});