const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 8000;

app.use(cors())
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Server Running")
})

app.get('/about',(req,res)=>{
    res.send("About Page")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});