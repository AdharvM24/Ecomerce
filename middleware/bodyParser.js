const bodyParser = require('body-parser');

const configureBodyParser = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
};

module.exports = configureBodyParser;
