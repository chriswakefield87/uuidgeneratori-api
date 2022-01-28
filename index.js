const port = process.env.PORT || 8000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const { appendTo } = require('cheerio/lib/api/manipulation');

const app = express();

const quotes = [];

app.get('/', (req, res) => {
    res.json('Welcome to my mindfulness quotes API');
})

app.get('/quote', (req, res) => {
    axios.get('https://wisdomquotes.com/mindfulness-quotes/')
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);

            $('blockquote:contains()', html).each(function () {
                const quoteraw = $(this).text();
                const quote = quoteraw.substring(0, quoteraw.lastIndexOf(".") + 1);
                let author = quoteraw.substring(quoteraw.lastIndexOf('.') + 2);
                author = (author.replace("Click to tweet", "")).trim();
                quotes.push({
                    quote,
                    author
                })
            })
            res.json(quotes);
        }).catch((err) => console.log(err));
})

app.listen(port, () => console.log(`Server running on port ${port}`));