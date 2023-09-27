var app = require('./controller/app');
var PORT = process.env.PORT || 8081;
var server = process.env.SERVER || 'localhost';

app.listen(PORT, server, () => {
    console.log(`Server is listening on ${server}:${PORT}`);
});