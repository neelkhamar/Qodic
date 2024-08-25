// Define an async function to fetch data from all APIs and process the results
const fetchAndProcessData = async (endpoints, key) => {
    try {
        // Map over the endpoints and fetch data from each API
        const fetchPromises = endpoints.map(async (endpoint) => {
            const response = await fetch(key ? endpoint[key] : endpoint);
            if (!response.ok) {
                throw new Error(`Failed to fetch from ${key ? endpoint[key] : endpoint}`);
            }
            const data = await response.json();
            return data;
        });

        // Wait for all fetch operations to complete
        const results = await Promise.all(fetchPromises);
        // Process results as needed, for example, extracting relevant information
        const finalResult = results.map(result => ({
            ...result
        }));

        return finalResult;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

module.exports = fetchAndProcessData

// Example usage
// fetchAndProcessData([
//     "https://swapi.dev/api/films/1/",
//     "https://swapi.dev/api/films/2/",
//     "https://swapi.dev/api/films/3/",
//     "https://swapi.dev/api/films/6/"
// ])
//     .then(finalResult => console.log('Final Processed Data:', finalResult))
//     .catch(error => console.error('Error in fetchAndProcessData:', error));
