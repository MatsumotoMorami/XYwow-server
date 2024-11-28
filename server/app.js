const express = require("express");
const { exec } = require('child_process');
const fs = require("node:fs");
const app = express();
const port = 1145;

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to XYwow!');
});

app.get('/cn', (req, res) => {
    runCommand("tskill Sinmai");
    runCommand(`start "D:\\F5i96XO0_2024\\2024\\Package\\start.bat"`);
})

app.get('/jp', (req, res) => {
    runCommand("tskill Sinmai");
    runCommand(`start "D:\\maimaI\\Package\\start.bat"`);
})

app.get('/en', (req, res) => {
    runCommand("tskill Sinmai");
    runCommand(`start "G:\\Package\\start.bat"`);
})

app.listen(port, () => {
    console.log(`XYwow server listening on port ${port}`);
});