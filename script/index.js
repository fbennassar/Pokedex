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
                <td><span class="badge rounded-pill text-bg-secondary" id="${response.data.types[0].type.name}">${types}</span></td>
                <td>${response.data.id}</td>
                <td><a href="./pokemon.html?code=${response.data.id}">Details</a></td>
            </tr>
            `;
        });
        
        document.getElementById("bodyTable").innerHTML = output;
    })
}
document.getElementById("searchButton").addEventListener("click", function(event) {
    event.preventDefault();
    searchPokemon();
  });

addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        searchPokemon();
    }
});

function searchPokemon() {
    var code = document.getElementById("search").value;
    code = code.toLowerCase();
    if(code == ""){
        offset = 0;
        limit = 20;
        getPokemon();
        return;
    }
    axios.get('https://pokeapi.co/api/v2/pokemon/' + code)
    .then(function (response) {
        var types = "";
        response.data.types.forEach(element => {
            if(types.length > 1){
                types += " / ";
            }
            types += element.type.name.charAt(0).toUpperCase() + element.type.name.slice(1) + " ";
        });

        var name = response.data.name.charAt(0).toUpperCase() + response.data.name.slice(1);

        var output = `
        <tr>
            <td><img src="${response.data.sprites.front_default}" alt="${response.data.name}"></td>
            <td>${name}</td>
            <td><span class="badge rounded-pill text-bg-secondary" id="${response.data.types[0].type.name}">${types}</span></td>
            <td>${response.data.id}</td>
            <td><a href="./pokemon.html?code=${response.data.id}">Details</a></td>
        </tr>
        `;
 
        document.getElementById("bodyTable").innerHTML = output;
        
        
    })
    .catch(function (error) {
        document.getElementById("bodyTable").innerHTML = "<tr><td colspan='5'>No results found</td></tr>";
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

function loadMore() {
    offset += 20;
    limit += 20;
    getPokemon();
    window.scrollTo(0, 0);
}

document.getElementById("next2").addEventListener("click", loadMore);

function loadLess() {
    if(offset == 0){
        return;
    }
    offset -= 20;
    limit -= 20;
    getPokemon();
}

document.getElementById("previous2").addEventListener("click", loadLess);


function goBack() {
    offset = 0;
    limit = 20;
    getPokemon();
}

document.getElementById("goBack").addEventListener("click", goBack);