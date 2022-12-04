const http = require("http");
const fs = require("fs");

const { MongoClient } = require("mongodb");
const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");

http.createServer(async function(request, response) {
	let url = request.url;
	if (url == "/") {
		const index = fs.readFileSync("C:/Users/lloid/Documents/GitHub/DataBaseLabs/Lab9/index.html");
		response.writeHead(200, {"Content-Type": "text/html; charset=utf8"});
		response.end(index);
	}
	else if (url == "/style.css") {
		const style = fs.readFileSync("C:/Users/lloid/Documents/GitHub/DataBaseLabs/Lab9/style.css");
		response.writeHead(200, {"Content-Type": "text/css; charset=utf8"});
		response.end(style);
	}
	else if (url == "/main.js") {
		const script = fs.readFileSync("C:/Users/lloid/Documents/GitHub/DataBaseLabs/Lab9/pages/main.js");
		response.writeHead(200, { "Content-Type": "text/javascript; charset=utf8" });
		response.end(script);
	}
	else if (url == "/show/show.js") {
		const script = fs.readFileSync("C:/Users/lloid/Documents/GitHub/DataBaseLabs/Lab9/show/show.js");
		response.writeHead(200, { "Content-Type": "text/javascript; charset=utf8" });
		response.end(script);
	}
	else if (url == "/articlesList") {
		response.writeHead(200, { "Content-Type": "application/json; charset=utf8" });
		let data = await getArticles();
		response.write(JSON.stringify(data));
		response.end();
	}
	else if (url == "/articlesTitle") {
		response.writeHead(200, { "Content-Type": "application/json; charset=utf8" });
		let dataReq = "";
		request.on("data", chunk => {
			dataReq += chunk;
		});
		request.on("end", async function () {
			dataReq = JSON.parse(dataReq);
			let data = await getArticlesTitle(dataReq["title"]);
			response.write(JSON.stringify(data));
			response.end();
		});
	}
	else if (url == "/articlesAuthor") {
		response.writeHead(200, { "Content-Type": "application/json; charset=utf8" });
		let dataReq = "";
		request.on("data", chunk => {
			dataReq += chunk;
		});
		request.on("end", async function () {
			dataReq = JSON.parse(dataReq);
			let data = await getArticlesAuthor(dataReq["author"]);
			response.write(JSON.stringify(data));
			response.end();
		});
	}
}).listen(3000, "127.0.0.1", function() {
	console.log("Сервер начал прослушивание запросов на порту 3000");
});

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
                    _id: 0,
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
					_id: 0,
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
					_id: 0,
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