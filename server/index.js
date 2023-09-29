var app = require('./controller/app');
var PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});