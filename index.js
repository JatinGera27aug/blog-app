const express = require('express');
const app = express();
app.use(express.json());
app.set(express.urlencoded({ extended: true }));
const cors = require('cors');
const BlogLimiter = require('./middlewares/api_rate_limiterMiddleware')
require('dotenv').config();
const authRoutes = require('./routes/blog.js')
const connectToDb = require('./config/db.js')
connectToDb();

const path = require("path");
const _dirname = path.resolve();

const PORT =process.env.PORT || 9000 ;
app.use(cors());
// app.use(express.static(path.join(_dirname, "client" ,"build")))
// app.get('*', (req, res) => {
//     res.sendFile(path.join(_dirname, "client", "build", "index.html"))
// })
app.get('/',(req,res)=>{
    res.send('Hello World')
})


app.use(express.static("public/uploads"))   // else file will not show in frontend
//api routes
app.use('/api',BlogLimiter, authRoutes)

app.listen(PORT,'0.0.0.0',()=>{
    console.log(`Server is running on port ${PORT}`)
})