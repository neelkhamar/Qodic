const express = require('express');
const router = express.Router();
const APIHandler = require('../utils/api');
const fetchAndProcessData = require('../utils/reccursiveFn');
const { setCacheData, getCacheData } = require('../utils/redis');

const swapiBaseURL = process.env.SwapiBaseURL;

// Fetch Characters
router.get('/getCharacters', async (req, res) => {
    try {
        let page = req?.query?.page ?? 1;
        let redisKey = `character_${page}`;
        let redisData = await getCacheData(redisKey);
        // If data is present in cache, return the cached data
        if (redisData) {
            console.log("Retrieved from cache");
            return res.status(200).json({ success: true, data: redisData })
        }
        const options = {
            method: "GET",
            url: swapiBaseURL + `/people?page=${page}`,
            data: null
        };
        let response = await APIHandler(options);
        let requests = response?.data?.results?.map(async (item) => {
            // Map each film data with the parent data
            if (item?.films?.length > 0) {
                let result = await fetchAndProcessData(item?.films)
                item.films = result;
            }

            // Map each species data with the parent data
            if (item?.species?.length > 0) {
                let result = await fetchAndProcessData(item?.species)
                item.species = result;
            }

            // Map homeworld data with the parent data
            if (item?.homeworld) {
                const opt = {
                    method: "GET",
                    url: item?.homeworld,
                    data: null
                }
                let result = await APIHandler(opt)
                item.homeworld = result?.data;
            }
            return item;
        })

        await Promise.all(requests);
        await setCacheData(redisKey, response?.data);
        res.status(200).json({ success: true, data: response?.data })
    } catch (error) {
        res.status(500).json({ success: false, error: 'Something went wrong' });
    }
});

module.exports = router;