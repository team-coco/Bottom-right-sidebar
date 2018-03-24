const app = require('./app.js');

const port = process.env.PORT || 3010;
app.listen(port, () => console.log('Express listening on port ', port));
