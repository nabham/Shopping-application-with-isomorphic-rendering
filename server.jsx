import express from 'express';
import Query from './query';
import {createStore} from 'redux';
import { match } from 'react-router';
import reducer from './shared/reducers';
import createLocation from 'history/lib/createLocation';
var bodyParser = require('body-parser')
var path = require('path');
import routes from './shared/routes';
const app = express();
app.use(express.static('public'))


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api',Query);


app.use((req, res) => {
    console.log('try');
    //console.log(getInitialState());
    const location = createLocation(req.url);
    const store = createStore(reducer);
    const initialState = store.getState();
  console.log('logging initialstate');
 console.log(initialState);

 match({routes,location},(err,redirectLocation, renderProps) => {

     if(err){
         return res.status(500).end('Internal server error')
     }
     else if(!renderProps){
         return res.status(404).end('Not Found')
     }

     console.log(renderProps);
     const HTML = `
     <html>
       <head>
         <meta charset="utf-8">

         <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
         <link rel="stylesheet" href="css/styles.css" >
         <title> Ekart</title>
         <script>
               window.__INITIAL_STATE__= ${JSON.stringify(initialState)};
           </script>
       </head>
       <body>
         <div id="app"></div>

         <script type="text/javascript" src="/bundle.js"></script>
       </body>
     </html>
     `
     res.end(HTML);
 })

});



export default app;
