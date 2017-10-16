const
    // db         = require('mongoose'),
    bodyParser = require('body-parser'),
    express    = require('express'),
    static     = require('serve-static'),

    // dbconn = 'mongodb://localhost:27017/madkap',
    port   = process.env.PORT || 8888,

    app       = express();

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(static(__dirname + '/public', {
    fallthrough: true
}));

// ROUTING
app.get('/', (req, res) => res.send('index.html'))

app.use((err, req, res, next) => {
    console.log('ERROR');
    console.error(err);
    res.redirect('/');
})

app.listen(port, (err) => {
    if (err) console.error(err.toString())
    else console.info("Listening on port %s", port)
})

// db.connect(dbconn, err => {
//     err && console.log(err.toString());
//     !err && console.log('Successfully connected to database');
// });