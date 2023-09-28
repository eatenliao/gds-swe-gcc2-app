var app = require('./controller/app');
var PORT = process.env.PORT || 8081;
var server = process.env.SERVER || 'localhost';
var cors = require('cors');

// Allow requests from specific origins
const allowedOrigins = ['https://gds-swe-gcc2-client.vercel.app'];
app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.listen(PORT, server, () => {
    console.log(`Server is listening on ${server}:${PORT}`);
});