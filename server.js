const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use( (req, res, next) => {
	let now = new Date().toString();
	let log = `${now}: ${req.method} ${req.url}`
	console.log(log);

	fs.appendFile('server.log', log + '\n', (err) => {
		if(err){
			console.log('Unablle to append to server.log');
		}
	});

	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=> {
	return new Date().getFullYear();
}); 

hbs.registerHelper('screamIt', (text)=> {
	return text.toUpperCase();
}); 

app.get('/', (req, res) => {
	//res.send('<h1>hello express</h1>');
	res.render('home', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome All',

	})
});

app.get('/about',(req, res) => {
	// res.send('About Page');
	res.render('about.hbs', {
		pageTitle: 'About Page',

	});
});

app.get('/projects',(req, res) => {
	// res.send('About Page');
	res.render('projects.hbs', {
		pageTitle: 'Portfolio Page',

	});
});

app.get('/bad',(req, res) => {
	res.send({
		errorMessage: 'Error Handling'
	});
});


app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});