let btnArticlesList = document.getElementById("btnArticlesList");
btnArticlesList.addEventListener("click", async function () {
	let response = await fetch("/articlesList", { method: "GET" });
	let data = await response.json();
	showArticles(data);
});

let inputArticlesTitle = document.getElementById("inputArticlesTitle");
let btnArticlesTitle = document.getElementById("btnArticlesTitle");
btnArticlesTitle.addEventListener("click", async function() {
	let title = {
		title: inputArticlesTitle.value,
	}
	let response = await fetch("/articlesTitle", { method: "POST", body: JSON.stringify(title) });
	let data = await response.json();
	showArticles(data);
})

let selectAuthorArticles = document.getElementById("selectAuthorArticles");
let btnAuthorArticles = document.getElementById("btnAuthorArticles");
btnAuthorArticles.addEventListener("click", async function() {
	let author = {
		author: selectAuthorArticles.value,
	}
	let response = await fetch("/articlesAuthor", { method: "POST", body: JSON.stringify(author) });
	let data = await response.json();
	showArticles(data);
});

let articles = document.getElementById("articles");
function showArticles(data) {
	articles.innerHTML = "";
	let keys = Object.keys(data[0]);
	for (let i = 0; i < data.length; i++) {
        let number = i + 1;
		let node = document.createTextNode("number: " + number + "\n");
		articles.appendChild(node);
		for (let j = 0; j < keys.length; j++) {
			let text = keys[j] + ": " + data[i][keys[j]] + "\n"
			let node = document.createTextNode(text);
			articles.appendChild(node);
		}
        node = document.createTextNode("\n");
        articles.appendChild(node);
	}
}