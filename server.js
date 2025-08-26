import 'dotenv/config';
import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());

const CALENDLY_API_TOKEN = process.env.CALENDLY_PERSONAL_ACCESS_TOKEN;

app.get('/api/calendly-user', async (req, res) => {
  if (!CALENDLY_API_TOKEN) {
    return res.status(500).json({ message: 'Calendly API token is not configured.' });
  }

  try {
    const userResponse = await axios.get('https://api.calendly.com/users/me', {
      headers: {
        'Authorization': `Bearer ${CALENDLY_API_TOKEN}`
      }
    });
    res.json(userResponse.data.resource);
  } catch (error) {
    console.error('Error fetching from Calendly:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Failed to fetch user information from Calendly.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
