import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users';
import { LinksAPI} from '../imports/api/links';
import '../imports/startup/simple-schema-configuration';

Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1);
    const link = LinksAPI.findOne({ _id });

    if(link) {
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
      Meteor.call('links.trackVisit', _id);
    } else {
      next();
    }
    
  });

  // WebApp.connectHandlers.use((req, res, next) => {
  //   console.log('This is from my custom middleware!');
  //   console.log(req.url, req.method, req.headers, req.query);

  //   // res.statusCode = 404;
  //   // res.setHeader('my-custom-header', 'Felix was here!');
  //   // res.write('<h1>Te amo Angelica Abbate. Att: Felix</h1>');
  //   // res.end();

  //   next();
  // });
});
