import express from 'express';
import Query from './query';
import React from 'react';
import ReactDOMServer from 'react-dom/server'
import {createStore} from 'redux';
import { RoutingContext,match } from 'react-router';
import reducer from './shared/reducers';
import createLocation from 'history/lib/createLocation';
import {Provider} from 'react-redux';
var bodyParser = require('body-parser')
var path = require('path');
import routes from './shared/routes';
const app = express();

app.use(express.static('public'));
app.use('*/css',express.static(path.join(__dirname, 'public/css')));
app.use('*/images',express.static(path.join(__dirname, 'public/images')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//all api requests router
app.use('/api',Query);

//server-side rendering middleware
app.use((req, res) => {
    const location = createLocation(req.url);
    const store = createStore(reducer);

    //mapping route to location
    match({routes,location},(err,redirectLocation, renderProps) => {
        //if some error occured while retrieving
        if(err){
            return res.status(500).end('Internal server error')
        }
        else if(!renderProps){
            return res.status(404).end('Not Found')
        }

        const initialState = store.getState();

        //static initial html-view
        const comhtml = ReactDOMServer.renderToString(<Provider store={store}>
            <RoutingContext {...renderProps} />
            </Provider>
        );

        //injecting initial-view and initial-state
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
             <div id="app">${comhtml}</div>
             <script type="text/javascript" src="/bundle.js"></script>
           </body>
         </html>
         `
     res.send(HTML);
    })
});

export default app;
