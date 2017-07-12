let express = require('express')
let app = express()

let nodemailer = require('nodemailer');


/**
 * Modules de Securité d'une API (logs, XSS securité etc...)
 */
let cors = require('cors'); // pour l'accès à l'API
let bodyParser = require('body-parser'); // pour la sécurité
let logger = require('morgan'); // permet d'utiliser des logs pour tracer dans la console
let helmet = require('helmet'); // pour la sécurité des sessions
let YouTube = require('youtube-node');

let youTube = new YouTube();

youTube.setKey('AIzaSyB1OOSpTREs85WUMvIgJvLTZKye4BVsoFU');
app.use(logger('dev'));
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 50000
}));

// Option CORS to authorize local URL
let corsOptions = {
  origin: 'http://localhost:8090',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions));
logger('tiny')
app.use(helmet());


/**
 * Module RethinkDb
 */
let r = require('rethinkdb');


var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "63a6a7bd9986bd",
    pass: "928ab9a34325e9"
  }
});

/**
 * Erreur 500 sortie en JSON
 */
app.use(function (error, request, response, next) {
  response.status(error.status || 500);
  response.json({
    error: error.message
  });
});



let connection = r.connect({
  db: "test" //your database (changer le nom si besoin)
}).then((connection) => {


  //requête pour filtrer par mot-clé 
  app.get('/search/:keyword', (req, res) => {
    console.log("llamando search");
    let keyword = 'tutorial ' + req.params.keyword
    console.log("Keyword: ", keyword);
    console.log(keyword.length);

    youTube.search(keyword, 10, function (error, result) {
      if (error) {
        console.log('ERROR IN SEARCH LINE 82: ', error);
      } else {
        res.json(result);
      }
    });

  });


  //Get a specific video
  app.get('/video/:id', (req, res) => {

    //récupérer l'id en paramètre
    let id = req.params.id;
    console.log('Este es el id: ' + id);

    youTube.getById(id, function (error, result) {
      if (error) {
        console.log('Error in line 101: ' + error);
      } else {
        res.json(result);
      }
    });
  });

  app.get('/favlist', (req, res) => {
    r.table('youtubeApp').run(connection, (err, cursor) => {
      if (err) throw err;
      cursor.toArray((err, result) => {
        res.json(result)
      })
    })
  });


  app.post('/calladdfav', (req, res) => {
    let newAdd = req.body;
    console.log(newAdd.items[0].snippet.title);
    console.log(newAdd.items[0].id);

    r.table('youtubeApp').filter({
      id: newAdd.items[0].id
    }).isEmpty().run(connection, (err, result) => {
      res.json(result);
    })
  });


  app.post('/addfav', (req, res) => {
    let newAdd = req.body;
    console.log(newAdd);

    r.table('youtubeApp').insert({
      id: newAdd.items[0].id,
      title: newAdd.items[0].snippet.title
    }).run(connection, (err, result) => {
      res.json(result);
    })
  });


  app.post('/sendEmail', (req, res) => {
    let email = req.body.email;
    let video = req.body.video;

    let mailOptions = {
      from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
      to: email, // list of receivers
      subject: 'You have received a new recommandation! ✔', // Subject line
      text: `Someone thought this video might be of your interest, check it out!: ${video}`, // plain text body
    };

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("fallo")
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
      res.json(true);
    });


    // r.table('youtubeAppEmails').insert()
  });


  app.get('/favcount', (req, res) => {
    r.table('youtubeApp').count().run(connection, (err, cursor) => {
      if (err) throw err;
      res.json(cursor);
    })
  });

}) //closes rethinkDB


app.listen(3000, function () {
  console.log('Listened on port 3000!')
})
