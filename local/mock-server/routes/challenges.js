const challengeRoutes = (app, fs) => {
    // variables
    const dataPath_challenges = './data/challenges.json';
    const dataPath_challengesById = './data/challengesById.json'
  
    // Get all the challenges
    app.get('/api/mychallenges', (req, res) => {

      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
      res.setHeader('Access-Control-Allow-Credentials', true);

      fs.readFile(dataPath_challenges, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }

        data = JSON.parse(data)

        console.log(data);
  
        res.send(data);
      });
    });

    // Get challenges per id
    app.get('/api/mychallenges/:id', (req, res) => {

      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
      res.setHeader('Access-Control-Allow-Credentials', true);

      fs.readFile(dataPath_challengesById, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }

        console.log("User has requested to view the challenge of this id :-")
        console.log(req.params.id)

        data = JSON.parse(data)

        console.log(data[req.params.id]);
  
        res.send(data[req.params.id]);
      });
    });
  };
  
  module.exports = challengeRoutes;