export function showArticlesWithButtons(data, clickBtnShowFullArticle, clickBtnDeleteArticle) {
    let articles = document.getElementById('articles');
	articles.innerHTML = '';
	let i = 1;
	data.forEach(doc => {
		let keys = Object.keys(doc);
		let divElement = document.createElement("div");
		divElement.className = "item";
		let divArticleInfo = document.createElement("div");
		divArticleInfo.className = "info";
		let divButtons = document.createElement("div");
		divButtons.className = "controls";

		let btnShowFullArticle = document.createElement("button");
		btnShowFullArticle.textContent = "Полная информация";
		btnShowFullArticle.addEventListener("click", clickBtnShowFullArticle);

		let btnDeleteArticle = document.createElement("button");
		btnDeleteArticle.textContent = "Удалить";
		btnDeleteArticle.addEventListener("click", clickBtnDeleteArticle);

		divButtons.appendChild(btnShowFullArticle);
		divButtons.appendChild(btnDeleteArticle);

		let spanNumber = document.createElement("span");
		spanNumber.className = "number";
		let node = document.createTextNode("number: " + i + '\n');
		spanNumber.appendChild(node);
		divArticleInfo.appendChild(spanNumber);
		keys.forEach(key => {
			let span = document.createElement("span");
			span.className = key;
			let text = key + ': ' + doc[key] + '\n'
			let node = document.createTextNode(text);
			span.appendChild(node);
			divArticleInfo.appendChild(span);
			divElement.appendChild(divArticleInfo);
		});
		divElement.appendChild(divButtons);
		articles.appendChild(divElement);
		i += 1;
	});
}

/*
export function showArticlesWithButtons(data) {
    let articles = document.getElementById("articles");
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
}*/