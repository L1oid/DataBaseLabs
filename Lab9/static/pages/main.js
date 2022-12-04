import { showArticlesWithButtons } from "./show/show.js"

export function renderMain() {
    let root = document.body;
	root.innerHTML = "";

    let btnArticlesList = document.createElement("button");
    btnArticlesList.id = "btnArticlesList";
    btnArticlesList.textContent = "Список статей"
    btnArticlesList.addEventListener("click", clickBtnArticlesList);
    root.appendChild(btnArticlesList);

    let divArticlesTitle = document.createElement("div");
    let inputArticlesTitle = document.createElement("input");
    inputArticlesTitle.id = "inputArticlesTitle";
    divArticlesTitle.appendChild(inputArticlesTitle);
    let btnArticlesTitle = document.createElement("button");
    btnArticlesTitle.id = "btnArticlesTitle";
    btnArticlesTitle.textContent = "Поиск по названию";
    btnArticlesTitle.addEventListener("click", clickBtnArticlesTitle);
    divArticlesTitle.appendChild(btnArticlesTitle);
    root.appendChild(divArticlesTitle);

    let divAuthorArticles = document.createElement("div");
    let selectAuthorArticles = document.createElement("select");
    selectAuthorArticles.id = "selectAuthorArticles";
    let options = ["Иванов Иван", "Марк Цукерберг", "Стив Джобс", "Билл Гейтс", "Тони Старк", "Продуктивный чувак"];
    options.forEach(optionParameter => {
		let option = document.createElement("option");
		option.textContent = optionParameter;
		selectAuthorArticles.appendChild(option);
	});
    divAuthorArticles.appendChild(selectAuthorArticles);
    let btnAuthorArticles = document.createElement("button");
    btnAuthorArticles.id = "btnAuthorArticles";
    btnAuthorArticles.textContent = "Поиск по автору";
    btnAuthorArticles.addEventListener("click", clickBtnAuthorArticles);
    divAuthorArticles.appendChild(btnAuthorArticles);
    root.appendChild(divAuthorArticles);

    let articles = document.createElement("div");
    articles.id = "articles";
    root.appendChild(articles);
}

function getId(event) {
	let item = event.target.closest(".item");
	let object_id = item.querySelector("._id").textContent;
	let id = object_id.replace("_id: ", "");
	return id;
}

async function clickBtnArticlesList() {
	let response = await fetch("/articlesList", { method: "GET" });
	let data = await response.json();
	showArticlesWithButtons(data, clickBtnShowFullArticle, clickBtnDeleteArticle);
}

async function clickBtnShowFullArticle(event) {

}

async function clickBtnDeleteArticle(event) {
	let id = getId(event);
    await fetch('/articles/' + id, { method: 'DELETE', headers: { "Content-type": "application/json; charset=utf-8" } });
    clickBtnArticlesList();
}

async function clickBtnArticlesTitle() {
    let inputArticlesTitle = document.getElementById("inputArticlesTitle");
	let title = {
		title: inputArticlesTitle.value,
	}
	let response = await fetch("/articlesTitle", { method: 'POST', headers: { "Content-type": "application/json; charset=utf-8" }, body: JSON.stringify(title) });
	let data = await response.json();
	showArticlesWithButtons(data, clickBtnShowFullArticle, clickBtnDeleteArticle);
}

async function clickBtnAuthorArticles() {
    let selectAuthorArticles = document.getElementById("selectAuthorArticles");
	let author = {
		author: selectAuthorArticles.value,
	}
	let response = await fetch("/articlesAuthor", { method: 'POST', headers: { "Content-type": "application/json; charset=utf-8" }, body: JSON.stringify(author) });
	let data = await response.json();
	showArticlesWithButtons(data, clickBtnShowFullArticle, clickBtnDeleteArticle);
}

renderMain();