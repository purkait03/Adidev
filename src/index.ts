import dotenv from 'dotenv';
import {connectDB} from './database/index.js';
import {app} from './app.js';

dotenv.config({ path: './.env' });

const port = process.env.PORT || 8080;


connectDB()
.then(()=>{
app.listen(port, () => {
    console.log(`Application is running at http://localhost:${port}`);
})
})
.catch((err)=>{
    console.log(`Database Connection failed : ${err}`);
    
})