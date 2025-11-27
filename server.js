import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.get("/meter", async (req, res) => {
    try {
        const response = await fetch(process.env.API_URL_METER, {
            headers: {
                "Authorization": `${process.env.API_TOKEN}`,
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
});

app.get("/evinterface", async (req, res) => {
    try {
        const response = await fetch(process.env.API_URL_EV, {
            headers: {
                "Authorization": `${process.env.API_TOKEN}`,
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
});

app.get("/system", async (req, res) => {
    try {
        const response = await fetch(process.env.API_URL_SYSTEM, {
            headers: {
                "Authorization": `${process.env.API_TOKEN}`,
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
});

app.listen(14500, () => console.log("Proxy running on http://...:14500"));
