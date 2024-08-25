const mongoose = require("mongoose")

const uri = `mongodb+srv://neelkhamar:${process.env.DatabasePassword}@qodic.hfo2t.mongodb.net/?retryWrites=true&w=majority&appName=Qodic`;

module.exports = {
    initialiseConnection: () => {
        mongoose.connect(uri)
            .then(() => {
                console.log('Connected successfully to MongoDB');
            })
            .catch((err) => {
                console.error('Connection error', err);
            });
    }
}