const {MongoClient} = require("mongodb");

const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");
async function run() {
	try {
		await mongoClient.connect();
		const db = mongoClient.db("FirstBase");
		const collection = db.collection("ScienceJournal");
		await collection.insertOne({test: "testDocument"});
		await collection.deleteMany({});
	} catch (err) {
		console.log(err);
	} finally {
		await mongoClient.close();
	}
}

run();