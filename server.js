const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.use((req, res, next) => {
    res.show = (name) => {
      res.sendFile(path.join(__dirname, `/views/${name}`));
    };
    next();
});

app.use('/user',(req, res, next) => {
    res.show = (name) => {
      res.sendFile(path.join(__dirname, `/views/forbidden.html`));
    };
    next();
});


  app.get('/', (req, res) => {
    res.show('index.html');
  });
  
  app.get('/about', (req, res) => {
    res.show('about.html');
  });
  
  app.get('/contact', (req, res) => {
    res.show('contact.html');
  });
  
  app.get('/user/settings', (req, res) => {
    res.show('settings.html');
  });
  
  app.get('/user/panel', (req, res) => {
    res.show('panel.html');
  });

app.use((req, res) => {
    res.status(404).show('404.html');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});