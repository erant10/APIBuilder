const app = require('./app');
const port = process.env.PORT || 3000;
const config = require('config');

function validateDBConf() {
    const errors = [];

    if (!config.has('DB')) {
        errors.push('Configuration json object must contain a DB property');
        return errors;
    }
    const dbProps = ['NAME', 'SERVER_NAME', 'PORT'];

    dbProps.forEach(propName => {
        if (!config.has(`DB.${propName}`)) {
            errors.push(`The DB configuration object must contain the ${propName} property`)
        }
    });
    return errors;
}

const errors = validateDBConf();
const parseErrors = (errors) => {
    return `cannot start server because of the following errors:
    \t* ${errors.join('\n\t* ')}`
};

if (errors.length !== 0) {
    err_msg = parseErrors(errors);
    throw new Error(err_msg);
} else {
    app.listen(port, () => {
        console.log(`Running on port ${port}`)
    });
}
