const express = require('express');
const routerV1 = require('./routes/router.v1.js');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('../swaggerConfig.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(morgan('tiny'));

// Middleware and route setup
// app.use(...);
// app.get(...);
// app.post(...);
// Other configurations

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use('/api', routerV1);

app.get("/", (req, res) => {
    res.json({ message: "Connected" });
});

module.exports = app;