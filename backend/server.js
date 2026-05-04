const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const OpenAI = require("openai");

const User = require("./models/User");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// OpenRouter
const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// REGISTER
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "Registration Successful",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Registration Failed",
    });
  }
});

// LOGIN
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );

    res.json({
      message: "Login Successful",
      token,
      user,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Login Failed",
    });
  }
});

// CHATBOT
app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const completion = await client.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
      messages: [
        { role: "user", content: userMessage },
      ],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      reply: "AI Error",
    });
  }
});

// SERVER
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});