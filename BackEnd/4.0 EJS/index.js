import express from 'express';

const app = express();
const port = 3000;
var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const d = new Date();
let today = d.getDay();
app.get('/', (req, res) => {
    res.render('index.ejs', {day : days[today]});
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});