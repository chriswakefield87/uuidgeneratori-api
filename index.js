
import {v4 as uuidv4} from 'uuid';
import express from 'express';

const port = process.env.PORT || 8000;

const app = express();

app.get('/', (req, res) => {
    let id = uuidv4();
    const obj = {
        "uuid" : id
    }
    res.json(obj);
})

app.listen(port, () => console.log(`Server running on port ${port}`));