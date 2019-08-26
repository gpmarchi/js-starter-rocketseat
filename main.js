function get_repos_from_github_api() {
    return new Promise(function (resolve, reject) {
        var textUserName = document.querySelector("div#div-add-user input");

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://api.github.com/users/" + textUserName.value + "/repos");
        xhr.send(null);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4)
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else if (xhr.status === 404) {
                    reject("Erro na requisição ao github. Usuário inexistente.");
                }
        }
    })
}

var buttonAddUser = document.querySelector("div#div-add-user button");
buttonAddUser.onclick = function () {

    var divAddUser = document.querySelector("div#div-add-user");
    var listNode = document.querySelector("div#div-add-user ul");

    if (listNode === null) {
        listNode = document.createElement("ul");
        listNode.id = "list-of-repos";
    } else {
        listNode.innerHTML = ""
    }

    listItemMessage = document.createElement("li");
    listItemMessage.innerText = "Carregando...";
    listNode.appendChild(listItemMessage);
    divAddUser.appendChild(listNode);

    get_repos_from_github_api()
        .then(function (response) {

            listNode.innerHTML = ""

            for (const repo of response) {
                var listItemNode = document.createElement("li");
                listItemNode.innerText = repo.name;
                listNode.appendChild(listItemNode);
            }

            divAddUser.appendChild(listNode);

        })
        .catch(function (error) {

            listItemMessage.innerText = error;

        });
}