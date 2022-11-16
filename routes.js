const fs = require('fs');
var parser = require('xml2json');

function routes(app, lms) {
  app.get('/', (req, res) => {
    res.send('Welcome');
  });

  app.get('/api/:db', (req, res) => {
    let obligation = true;
    let forbidden = false;
    fs.readFile('./datatype.xml', async function (err, data) {
      let json = parser.toJson(data);
      let obj = JSON.parse(json);
      let obligation_obj = obj.datatype.obligation;
      let forbidden_obj = obj.datatype.Forbidden;
      for (key in obligation_obj) {
        if (key === 'duration') {
          let parameters = obligation_obj[key];
          let start_time = new Date(parameters.startTime);
          start_time = Math.floor(start_time.getTime() / 1000);
          let duration = parameters.Time;
          let dur = '';
          for (let i = 0; i < duration.length; i++) {
            if (duration[i] === ' ') {
              break;
            }
            dur += duration[i];
          }
          let num = Number(dur) * 24 * 10800;
          let dum = await lms.methods.duration(num, start_time).call();
          obligation = obligation && dum;
          console.log(dum);
          console.log(obligation);
        }
      }
      res.send(obligation && !forbidden);
    });
  });
}
module.exports = routes;
