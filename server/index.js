const express = require('express');
const app = express();
// const cors = require('cors');
const PORT = process.env.PORT || 5000;

app.use(express.static('public'));

app.use("/", (req, res) => {
    res.send('server is up and running!');
});

// app.use('/api', require('./routes/api'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});