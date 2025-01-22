const { MongoClient } = require('mongodb');

// MongoDB connection string
const uri = "mongodb+srv://user1:user4022@cluster0.oqr6k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connection pool options
const options = {
    maxPoolSize: 10, // Maximum number of connections in the pool
};

// Create a new MongoClient with connection pooling
const client = new MongoClient(uri, options);

async function connectToMongoDB() {
    try {
        // Connect the client to the server
        await client.connect();
        console.log("Connected successfully to MongoDB");

        // Access a specific database
        const db = client.db("todoUsers"); // Replace "todoUsers" with your database name
        console.log("Database selected:", db.databaseName);

        // Perform operations on a collection
        const collection = db.collection("loginUsers"); // Replace "loginUsers" with your collection name

        // Delete all records from the collection
        const deleteResult = await deleteAllRecords(collection);
        console.log(`${deleteResult.deletedCount} records deleted successfully.`);

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    } finally {
        // Close the connection
        await client.close();
        console.log("Connection closed.");
    }
}

// Function to delete all records from a collection
async function deleteAllRecords(collection) {
    try {
        const result = await collection.deleteMany({});
        return result;
    } catch (error) {
        console.error("Error deleting records:", error);
    }
}

// Call the main function to connect and perform operations
connectToMongoDB();
