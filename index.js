const express = require('express');
const request = require('request-promise');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.listen(PORT, () => console.log(`
############################################
## AMAZON SEARCH SERVER on port : ${PORT} ##
############################################`));

const returnScraperApiUrl =  `http://api.scraperapi.com?api_key=f324da043c51f981a95b71d4cc291099&autoparse=true`;

// Welcome route
app.get('/', async (req, res) => {
    res.send('Welcome to Amazon Scraper API!');
});

app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${returnScraperApiUrl}&url=https://www.amazon.com/dp/${productId}`);
        res.json(JSON.parse(response));
        console.log(response)
    } catch (error) {
        res.json(error);
    }
});

// Get search results
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const { api_key } = req.query;
    
    try {
        const response = await request(`${returnScraperApiUrl}&url=https://www.amazon.com/s?k=${searchQuery}`);
        
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

/*
app.get('/shoes', async (req, res) => {

    sneaks.getProducts("Yeezy Cinder", 10, function(err, products){
        console.log(products)
        res.send(products);
    })

});


/ Get product reviews
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;
    
    try {
        const response = await request(`${returnScraperApiUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`);
        
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// Get product offers
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;
    
    try {
        const response = await request(`${returnScraperApiUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);
        
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

*/
