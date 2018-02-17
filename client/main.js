import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { routes, onAuthChange } from '../imports/routes/routes';

import '../imports/startup/simple-schema-configuration';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
  // Meteor.call('greetUser', 'Felix', (error, response) => {
  //   console.log('Greet User Arguments', error, response);
  // });

  // Meteor.call('addNumbers', 3, 10, (error, response) => {
  //   console.log('addNumbers Arguments', error, response);
  // });
  Session.set('showVisible', true);// Inicializando para ver los visibles = true por default
  render(routes, document.getElementById('render-target'));
});