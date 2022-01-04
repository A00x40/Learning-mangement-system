const mongoose = require('mongoose');
const app = require('./app');
const config = require('config');

const port = config.get("PORT") || 4000;
const db = config.get("DB").replace("password", config.get("DB_PASSWORD"));

mongoose
    .connect( db , {
    useNewUrlParser:true,
    useUnifiedTopology: true
})
.then(() => {
    console.info(`Successfully connected to MongoAtlas`);
})
.catch(error => {
    console.error('Error connecting to database: ', error);
    process.exit(1);
});

app.listen( port , () => {
    console.log(`App running on port ${port}`);
});


