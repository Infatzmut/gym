const express = require('express');
const exphbs = require('express-handlebars')
const path = require('path');
const app = express();
const morgan = require('morgan')
// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout : 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir : path.join(app.get('views'), 'layouts/partials'),
    extname : '.hbs',
}))

app.set('view engine', '.hbs');
// Middelware

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))
app.use(express.json());

// Global variables
app.use((req, res, next) => {
    next();
})
// Routes
app.use(require('./routes'))
//app.use(require('./routes/authentication'));


// Public 
app.use(express.static(path.join(__dirname, 'public')));

// Starting the server 
app.listen(app.get('port'), ()=> {
    console.log("Server running on port: "+app.get('port'));
})