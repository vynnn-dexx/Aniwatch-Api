const express = require('express');

const genre = require('./routes/genre.js');
const info = require('./routes/info.js');
const app = require('./routes/app.js');
const search = require('./routes/search.js');
const random = require('./routes/random.js');
const mix = require('./routes/mix.js');
const episode = require('./routes/episode.js');
const shedule = require('./routes/shedule.js');
const server = require('./routes/server.js');
const src = require('./routes/src1.js');

const inde = express();

// Middleware CORS Manual (Agar Vercel tidak error & aman dari block browser)
inde.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

try {
    inde.use('/api', genre);
    inde.use('/api', info);
    inde.use('/api', app);
    inde.use('/api', search);
    inde.use('/api', random);
    inde.use('/api', mix);
    inde.use('/api', episode);
    inde.use('/api', shedule);
    inde.use('/api', server);
    inde.use('/api', src);

    inde.get('/', (req, res) => {
        res.send("Api Is ON SERVICE !");
    });
} catch (error) {
    console.log(error);
}

// WAJIB UNTUK VERCEL SERVERLESS
module.exports = inde;

// Hanya berjalan jika dijalankan secara lokal (bukan di Vercel)
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 3005;
    inde.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
