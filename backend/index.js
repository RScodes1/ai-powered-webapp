require("dotenv").config();
const express = require('express');
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
app.use(cors(), express.json());

app.post("/", async (req, res) => {
    try {
        const { title, theme, mood } = req.body;
        const prompt = `Write a poem titled "${title}" with a theme of "${theme}" and a mood of "${mood}".`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);
        res.send({
            msg: "Here is the generated poem:",
            poem: text
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            msg: "An error occurred",
            error: err
        });
    }
});

app.listen(3000, () => {
    console.log("Server running");
});
