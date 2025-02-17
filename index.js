import express from 'express';
import fs from 'fs';

const app = express();

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("listening port: " + PORT);
})