import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config();

const router = express.Router();

router.post('/improve-text', async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  const { message } = req.body; 

  if (!message) {
    return res.status(400).json({ message: 'Message cannot be empty' });
  }

  const data = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: 'system', content: 'You are a literary assistant. Correct grammatical errors and improve the text.' },
      { role: 'user', content: message },
    ],
    temperature: 0.7,
  };

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    res.status(200).json(response.data.choices[0].message.content); // Отправляем только улучшенный текст
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Error fetching data from OpenAI' });
  }
});

export default router;
