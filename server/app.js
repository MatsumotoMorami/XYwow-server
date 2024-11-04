const express = require("express");
const { exec } = require('child_process');
const fs = require("node:fs");
const app = express();
const port = 1145;

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to XYwow!');
});

function runCommand(command,taskName) {
    const child = exec(command);
    child.on('error', (error) => {
        console.error(taskName+' error:', error);
    });
    child.on('close', (code) => {
        if (code !== 0) {
            console.warn(taskName+` warning: ${code}`);
        }
    });
    if(!child.exitCode)console.log(taskName+" Success")
    return child;
}

let CNbat = `"/start.bat"`;
let JPbat = `"/start.bat"`;

app.get('/cn', async(req, res) => {
    let opId = req.body.opId;
    let pwd = req.body.pwd;
    if (opId == undefined || pwd == undefined) {
        res.status(403).json({ msg: "Illegal request: Login Failed." });
    }
    let operatorList=JSON.parse(fs.readFileSync("operator.json", "utf-8"));
    if (!operatorList.includes({ opId, pwd })) {
        res.status(403).json({ msg: "Illegal request: No such operator." });
    }
    runCommand("taskkill /IM Sinmai.exe /F");
    runCommand("taskkill /IM inject.exe /F");
    runCommand("start " + CNbat);
})

app.get('/jp', (req, res) => {
    let opId = req.body.opId;
    let pwd = req.body.pwd;
    if (opId == undefined || pwd == undefined) {
        res.status(403).json({ msg: "Illegal request: Login Failed." });
    }
    let operatorList = JSON.parse(fs.readFileSync("operator.json", "utf-8"));
    if (!operatorList.includes({ opId, pwd })) {
        res.status(403).json({ msg: "Illegal request: No such operator." });
    }
    runCommand("taskkill /IM Sinmai.exe /F");
    runCommand("taskkill /IM inject.exe /F");
    runCommand("start " + JPbat);
})

app.listen(port, () => {
    console.log(`XYwow server listening on port ${port}`);
});