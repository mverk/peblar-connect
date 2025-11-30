import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/meter", async (req, res) => {
  try {
    const response = await fetch(process.env.API_URL_METER, {
      headers: {
        Authorization: `${process.env.API_TOKEN}`,
        "Content-Type": "application/json",
      },
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
        Authorization: `${process.env.API_TOKEN}`,
        "Content-Type": "application/json",
      },
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
        Authorization: `${process.env.API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});

app.get("/p1", async (req, res) => {
  try {
    const response = await fetch(process.env.METER_P1, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});

app.get("/peblarconnect/health", async (req, res) => {
  try {
    const data = {
      success: true,
      message: "Healthy",
    };
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: e.toString() });
  }
});

const filePath = path.join(__dirname, "data", "currentMode.json");

app.all("/peblarconnect/modes", async (req, res) => {
  try {
    if (req.method === "GET") {
      const jsonData = await readFile(filePath, "utf-8");
      const data = JSON.parse(jsonData);
      return res.json(data);
    }

    if (req.method === "POST") {
      const switchModeHeader = req.headers["switchmode"];
      if (!switchModeHeader) {
        return res
          .status(400)
          .json({ success: false, error: "Missing switchmode header" });
      }

      const allowedModes = ["standard", "solaronly", "solarandgrid"];
      if (!allowedModes.includes(switchModeHeader)) {
        return res
          .status(400)
          .json({
            success: false,
            error: switchModeHeader + " is not a valid mode.",
          });
      }

      const jsonData = await readFile(filePath, "utf-8");
      const data = JSON.parse(jsonData);
      data.currentMode = switchModeHeader;

      await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

      return res.json({ success: true, data });
    }

    res.status(405).json({ success: false, error: "Method not allowed" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, error: e.toString() });
  }
});

app.listen(14500, () =>
  console.log("Proxy running on http://192.168.2.58:14500")
);
