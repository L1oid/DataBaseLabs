export function showArticles(data) {
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
}