const mongoose = require('mongoose');
const app = require('./app');
const config = require('config');
const startScript = require('../../script');

const port = config.get("PORT") || 4000;
const db = config.get("DB").replace("password", config.get("DB_PASSWORD"));

mongoose
    .connect( db , {
    useNewUrlParser:true,
    useUnifiedTopology: true
})
.then(() => {
    console.info(`Successfully connected to MongoAtlas`);
    /*startScript().then(() => {
        console.info(`Loaded Start Script`);
    });*/
})
.catch(error => {
    console.error('Error connecting to database: ', error);
    process.exit(1);
});

app.listen( port , () => {
    console.log(`App running on port ${port}`);
});


