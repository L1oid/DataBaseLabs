const express = require('express');
const mongo = require('./mongo.js');
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("static"));
app.use(express.static("static/pages"));
app.use(express.static("static/show"));
app.use(bodyParser.json());

app.get("/articlesList", async function(request, response) {
	let data = await mongo.getArticles();
	response.send(JSON.stringify(data));
});

app.post("/articlesTitle", async function(request, response) {
	let dataRequest = request.body;
	let data = await mongo.getArticlesTitle(dataRequest['title']);
	response.send(JSON.stringify(data));
});

app.post("/articlesAuthor", async function(request, response) {
	let dataRequest = request.body;
	let data = await mongo.getArticlesTitle(dataRequest['author']);
	response.send(JSON.stringify(data));
});

app.delete("/articles/:object_id", async function (request, response) {
	let objectId = request.params["object_id"];
	await mongo.deleteArticles(objectId);
	response.send();
});

app.listen(3000);