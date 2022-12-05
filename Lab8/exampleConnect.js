const {MongoClient} = require("mongodb");

const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");
async function run() {
	try {
		await mongoClient.connect();
		const db = mongoClient.db("FirstBase");
		const collection = db.collection("ScienceJournal");
		await collection.insertOne({
			title: "Статья 1",
			authors: ["Иванов Иван"],
			date: new Date("03.12.2022"),
			content: "Текст статьи 1",
			tags: ["статья 1", "программирование", "веб", "инженерия"],
			reviews: [
				{
					name: "Алексей",
					comment: "Лучшая статья !!",
					mark: 10,
				},
				{
					name: "Максим",
					comment: "Я научился программировать!!!",
					mark: 9,
				},
				{
					name: "Дмитрий",
					comment: "Ничего не понятно((",
					mark: 2,
				}
			]
		});
		await collection.deleteMany({});
	} catch (err) {
		console.log(err);
	} finally {
		await mongoClient.close();
	}
}

run();