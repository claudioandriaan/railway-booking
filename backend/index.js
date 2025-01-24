import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/auth.js'

const app = express(); 

app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}))
app.use(cors());

// Connect to the database
const CONNECTION_URL = "mongodb+srv://user-client:user-client@cluster0.59yzhov.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const PORT = process.env.PORT || 8000;

mongoose.connect(CONNECTION_URL,  {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => app.listen(PORT, () => console.log(`Server Listining on port ${PORT}`)))
    .catch(() => console.log('Connetion failed !'));

app.use('/auth', userRoutes)

