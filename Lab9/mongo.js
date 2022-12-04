const { MongoClient, ObjectId } = require('mongodb');
const mongoClient = new MongoClient('mongodb://127.0.0.1:27017/');

module.exports = {
	getArticles: getArticles,
	getArticlesTitle: getArticlesTitle,
	getArticlesAuthor: getArticlesAuthor,
	deleteArticles: deleteArticles
}

async function getArticles() {
	let result = null;
	try {
		await mongoClient.connect();
		const db = mongoClient.db("Lab8");
		const articles = db.collection("ScienceJournal");
		result = await articles.aggregate([
			{
                $project: 
                {
                    title: 1,
                    authors: 1, 
                    date: 1
                }
            }
		]).toArray();
		return result;
	} catch (err) {
		console.log(err);
	} finally {
		await mongoClient.close();
	}
	return result;
}

async function getArticlesTitle(title) {
	let result = null;
	try {
		await mongoClient.connect();
		const fb = mongoClient.db("Lab8");
		const articles = fb.collection("ScienceJournal");
		result = await articles.aggregate([
			{ 
				$addFields: 
				{ 
					result: 
					{ 
						$regexMatch: 
						{ 
							input: "$title", 
							regex: title 
						} 
					} 
				} 
			},
			{ 
				$match: 
				{ 
					result: true 
				} 
			},
			{ 
				$project: 
				{
					title: 1, 
					authors: 1, 
					date: 1 
				} 
			}
		]).toArray();
	} catch (err) {
		console.log(err);
	} finally {
		await mongoClient.close();
	}
	return result;
}

async function getArticlesAuthor(author) {
	let result = null;
	try {
		await mongoClient.connect();
		const fb = mongoClient.db("Lab8");
		const articles = fb.collection("ScienceJournal");
		result = await articles.aggregate([
			{ 
				$match: 
				{ 
					authors: author 
				} 
			},
			{ 
				$project: 
				{
					title: 1 
				} 
			}
		]).toArray();
	} catch (err) {
		console.log(err);
	} finally {
		await mongoClient.close();
	}
	return result;
}

async function deleteArticles(objectId) {
	try {
		await mongoClient.connect();
		const fb = mongoClient.db("Lab8");
		const articles = fb.collection("ScienceJournal");
		await articles.deleteOne(
			{ 
				_id: ObjectId(objectId)
			}
		);
	} catch (err) {
		console.log(err);
	} finally {
		await mongoClient.close();
	}
}