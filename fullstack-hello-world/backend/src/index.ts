import express from 'express';
import { addRecord, getRecords, initDb } from './database';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.post('/api/records', async (req, res) => {
    const { name } = req.body;
    try {
        const newRecord = await addRecord(name);
        res.status(201).json(newRecord);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add record' });
    }
});

app.get('/api/records', async (req, res) => {
    try {
        const records = await getRecords();
        res.status(200).json(records);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve records' });
    }
});

const start = async () => {
    let retries = 5;
    while (retries > 0) {
        try {
            await initDb();
            console.log('Database initialized');
            app.listen(port, () => {
                console.log(`Server is running on http://localhost:${port}`);
            });
            break;
        } catch (err) {
            console.error('Failed to connect to database. Retrying...', retries);
            retries -= 1;
            await new Promise(res => setTimeout(res, 5000));
        }
    }
    if (retries === 0) {
        console.error('Could not connect to database after several attempts');
        process.exit(1);
    }
};


start();
