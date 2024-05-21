import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/weather', async (req, res) => {
    try {
        const { city } = req.query;
        if (!city) {
            return res.status(400).json({ error: 'City name is required' });
        }

        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${process.env.OPENWEATHERMAP_API_KEY}`);
        const weatherData = await weatherResponse.json();

        if (!weatherResponse.ok) {
            return res.status(weatherResponse.status).json({ error: weatherData.message });
        }

        const { lat, lon } = weatherData.coord;
        const timeZoneResponse = await fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=${process.env.TIMEZONEDB_API_KEY}&format=json&by=position&lat=${lat}&lng=${lon}`);
        const timeZoneData = await timeZoneResponse.json();

        if (!timeZoneResponse.ok) {
            return res.status(timeZoneResponse.status).json({ error: timeZoneData.message });
        }

        res.json({
            weather: weatherData,
            timeZone: timeZoneData
        });

        
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// app.get('/weather', (req, res) => {
//     res.sendFile(__dirname + './public/weather.html');
// });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
