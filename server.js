const express = require('express');
const path = require('path');
const app = express();
const hbs = require('express-handlebars');

//app.engine('.hbs', hbs());
app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', '.hbs');


app.use(express.static(path.join(__dirname, '/public')));

app.use((req, res, next) => {
    res.show = (name, opt) => {
//      res.sendFile(path.join(__dirname, `/views/${name}.html`));
      res.render(name , opt);
    };
    next();
});

app.use('/users', (req, res, next) => {
    res.show = () => {
//      res.sendFile(path.join(__dirname, `/views/forbidden.html`));
      res.render('forbidden');
    };
    next();
});

app.get('/', (req, res) => {
    res.show('index');
});
  
app.get('/hello/:name', (req, res) => {
    res.render('hello', { name: req.params.name });
});

app.get('/about', (req, res) => {
    res.show('about', { layout: 'dark'});
});

app.get('/user/settings', (req, res) => {
    res.show('settings');
});
  
app.get('/user/panel', (req, res) => {
    res.show('panel');
});

app.use((req, res) => {
    res.status(404).show('404');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});