require('dotenv').config()
const app = require('./app');
const mongoose = require('mongoose');

const port = process.env.PORT || 4000;
const db = process.env.DB.replace("password", process.env.DB_PASSWORD);

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


