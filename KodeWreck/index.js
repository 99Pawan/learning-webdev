import express from "express";
import bodyParser from "body-parser";
import axios from "axios"; 
import cors from "cors";
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors()); 

app.use(express.static("public"));

app.get("/",(req,res)=>{
  res.render("index.ejs");
});

app.get("/About",(req,res)=>{
  res.render("About.ejs");
});

let blogs = [
  {
    title: "Why Competitive Programming Matters",
    content: "Competitive programming is an essential skill for aspiring developers. It sharpens problem-solving abilities, teaches efficient coding techniques, and opens doors to top tech companies. Participating in contests is not only a way to improve but also a journey toward understanding complex algorithms and data structures."
  },
  {
    title: "The Power of Data Structures",
    content: "Mastering data structures is crucial in competitive programming. From arrays to advanced structures like segment trees, each plays a vital role in optimizing solutions. Efficient data handling can drastically reduce runtime, making data structures a key aspect of success in coding contests."
  },
  {
    title: "Dynamic Programming Demystified",
    content: "Dynamic programming (DP) can be challenging at first, but it’s one of the most rewarding techniques to learn. It allows you to break down complex problems into manageable subproblems, enabling solutions to otherwise intractable challenges. Start with simple DP problems and gradually move to advanced ones to build your skill."
  },
  {
    title: "Top 5 Algorithms to Know",
    content: "Some algorithms are fundamental in competitive programming. Sorting algorithms, graph traversal (like BFS and DFS), shortest path (Dijkstra’s and Floyd-Warshall), dynamic programming approaches, and searching algorithms form the backbone of many solutions. Mastering these will significantly enhance your competitive programming toolkit."
  },
  {
    title: "Tips to Ace Coding Contests",
    content: "Consistency and practice are key to excelling in coding contests. Participate in regular contests, analyze problems after the contest, and revisit unsolved problems. Joining a community like KodeWreck can provide motivation and support, along with resources to help you grow in competitive programming."
  }
];


app.get('/Blog', (req, res) => {
  res.render('Blog.ejs', { blogs }); // Render the page showing blogs
});


app.post('/submit-blog', (req, res) => {
  const { title, content } = req.body;

  // Add new blog entry to the array
  blogs.push({ title, content });

  // Check if the array has more than 5 entries
  if (blogs.length > 5) {
      blogs.shift(); // Remove the oldest entry
  }

  res.redirect('/Blog'); // Redirect to the blog page or a success page
});

app.get('/New-Blog', (req, res) => {
  res.render('New-Blog.ejs'); // render the form page
});

app.get("/Events",(req,res)=>{
  res.render("Events.ejs");
});

app.get("/Members",(req,res)=>{
  res.render("Members.ejs");
});

app.get("/Achievements",(req,res)=>{
  res.render("Achievements.ejs");
});

app.get("/Resources",(req,res)=>{
  res.render("Resources.ejs");
});

app.get("/Apply-now",(req,res)=>{
  res.render("Apply-now.ejs");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


const googleSheetsUrl = "https://script.google.com/macros/s/AKfycbwLuN4V8zDp6kHoHILLKQvJbZWdE7WpY9hNM0is1JltAHSdRqcP9ikdkVNZ85bfJD2M/exec";
app.post('/submit-form', async (req, res) => {
  const { 'kiit-email': kiitEmail, name, 'cf-profile': cfProfile, 'cc-profile': ccProfile } = req.body;

  // Validate the KIIT email
  if (!kiitEmail.endsWith('@kiit.ac.in')) {
    return res.status(400).send('Invalid KIIT email ID! Please use your KIIT email.');
  }

  try {
    // Send data to Google Apps Script
    const response = await axios.post(googleSheetsUrl, {
      'kiit-email': kiitEmail,
      name: name,
      'cf-profile': cfProfile,
      'cc-profile': ccProfile,
    });

    // Handle the response from Apps Script
    if (response.data.status === 'success') {
      res.status(200).send('Your application has been submitted successfully!');
    } else {
      res.status(500).send('Failed to save data to Google Sheets.');
    }
  } catch (error) {
    console.error('Error while submitting form:', error.message);
    res.status(500).send('An error occurred while submitting your application. Please try again later.');
  }
});