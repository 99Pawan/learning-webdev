import express from 'express';
const app = express();
const port = 3000;


app.get("/",(req,res) => {
  res.send('<h1>Hello World! This is a simple Express server.</h1>');
});

app.get("/about", (req,res) => {
  res.send('<h1>About Page</h1>');
})

app.get("/contact", (req,res) => {
  res.send('<h1>Contact</h1>');
})


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});