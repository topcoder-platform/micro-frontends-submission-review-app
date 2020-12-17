// load up our shiny new route for challenges
const challengeRoutes = require('./challenges');

const appRouter = (app, fs) => {
  // we've added in a default route here that handles empty routes
  // at the base API url
  app.get('/api', (req, res) => {
    res.send('welcome to the development api-server');
  });

  // run our challenge route module here to complete the wire up
  challengeRoutes(app, fs);
};

// this line is unchanged
module.exports = appRouter;