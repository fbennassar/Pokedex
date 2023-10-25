var offset = 0;
var limit = 20;

function getPokemon() {
    var promises = [];
    for (var i = offset + 1; i <= limit; i++) {
        promises.push(axios.get('https://pokeapi.co/api/v2/pokemon/' + i));
    }
    Promise.all(promises)
    .then(function (responses) {
        var output = "";
        responses.forEach(response => {
            console.log(response.data);

            var types = "";
            response.data.types.forEach(element => {
                if(types.length > 1){
                    types += " / ";
                }
                types += element.type.name.charAt(0).toUpperCase() + element.type.name.slice(1) + " ";
            });

            var name = response.data.name.charAt(0).toUpperCase() + response.data.name.slice(1);

            output += `
            <tr>
                <td><img src="${response.data.sprites.front_default}" alt="${response.data.name}"></td>
                <td>${name}</td>
                <td>${types}</td>
                <td>${response.data.id}</td>
                <td><a href="${response.data.species.url}">Details</a></td>
            </tr>
            `;
        });
        document.getElementById("bodyTable").innerHTML = output;
    })
}

function loadMore() {
    offset += 20;
    limit += 20;
    getPokemon();
    window.scrollTo(0, 0);
}

document.getElementById("next").addEventListener("click", loadMore);

function loadLess() {
    if(offset == 0){
        return;
    }
    offset -= 20;
    limit -= 20;
    getPokemon();
}

document.getElementById("previous").addEventListener("click", loadLess);


