async function getPokemon() {

    var url = window.location.search;
    const urlParams = new URLSearchParams(url);
    var code = urlParams.get('code');
    console.log(code);

    document.getElementById('nextPokemon').addEventListener("click", function(){
        code++;
        window.location.href = "pokemon.html?code=" + code;
    });

    document.getElementById('backPokemon').addEventListener("click", function(){
        if(code == 1){
            
        }
        else{
        code--;
        window.location.href = "pokemon.html?code=" + code;
        }
    });

    document.getElementById('pokedex').addEventListener("click", function(){
        window.location.href = "index.html";
    });

    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${code}`);

    console.log(response.data);

    document.getElementById('name').innerHTML = response.data.name.charAt(0).toUpperCase() + response.data.name.slice(1) + " #" + response.data.id;
    document.getElementById('sprite').src = response.data.sprites.front_default;


    var height = document.getElementById('height');

    if(response.data.height < 10){
        height.innerHTML = (response.data.height / 10).toFixed(1) + " m";
    } else {
        height.innerHTML = response.data.height / 10 + " m";
    }

    var weight = document.getElementById('weight');

    if(response.data.weight < 10){
        weight.innerHTML = (response.data.weight / 10).toFixed(1) + " kg";
    } else {
        weight.innerHTML = response.data.weight / 10 + " kg";
    }

    var types = "";
            response.data.types.forEach(element => {
                if(types.length > 1){
                    types += " / ";
                }
                types += element.type.name.charAt(0).toUpperCase() + element.type.name.slice(1) + " ";
            });

    document.getElementById('type').innerHTML = types;

    var abilities = document.getElementById('abilities');

    response.data.abilities.forEach(element => {
        abilities.innerHTML += element.ability.name.charAt(0).toUpperCase() + element.ability.name.slice(1) + "<br>";
    });

    document.getElementById("frontSprite").addEventListener("click", function(){
        document.getElementById("sprite").src = response.data.sprites.front_default;
    });
    
    document.getElementById("backSprite").addEventListener("click", function(){
        document.getElementById("sprite").src = response.data.sprites.back_default;
    
    });

    document.getElementById("shinySprite").addEventListener("click", function(){
        document.getElementById("sprite").src = response.data.sprites.front_shiny;
    });

    const response2 = await axios.get(`https://pokeapi.co/api/v2/type/${response.data.types[0].type.name}`);

  
    for (var i = 0; i < response2.data.damage_relations.double_damage_to.length; i++) {
        var type = response2.data.damage_relations.double_damage_to[i].name.charAt(0).toUpperCase() + response2.data.damage_relations.double_damage_to[i].name.slice(1);
        document.getElementById('strong').innerHTML += type + "<br>";
        
    }

    //weak against

    for (var i = 0; i < response2.data.damage_relations.double_damage_from.length; i++) {
        var type = response2.data.damage_relations.double_damage_from[i].name.charAt(0).toUpperCase() + response2.data.damage_relations.double_damage_from[i].name.slice(1);
        document.getElementById('weak').innerHTML += type + "<br>";
    }
   
    if(types.length > 1){
        const response3 = await axios.get(`https://pokeapi.co/api/v2/type/${response.data.types[1].type.name}`);
        for (var i = 0; i < response3.data.damage_relations.double_damage_to.length; i++) {
            var type = response3.data.damage_relations.double_damage_to[i].name.charAt(0).toUpperCase() + response3.data.damage_relations.double_damage_to[i].name.slice(1);
            document.getElementById('strong').innerHTML += type + "<br>";
            
        }

        for (var i = 0; i < response3.data.damage_relations.double_damage_from.length; i++) {
            var type = response3.data.damage_relations.double_damage_from[i].name.charAt(0).toUpperCase() + response3.data.damage_relations.double_damage_from[i].name.slice(1);
            document.getElementById('weak').innerHTML += type + "<br>";
        }


    }

    // const response2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${code}/encounters`);

    // var locationsList = document.getElementById('locationsList');

    // if(response2.data.length == 0){
    //     locationsList.innerHTML = "No places found";
    // }
    // response2.data.forEach(element => {
    //     locationsList.innerHTML += '<li>' + element.location_area.name.charAt(0).toUpperCase() + element.location_area.name.slice(1);
    // });

    // var tbody = document.getElementById('moves');

    // response.data.moves.sort(function(a, b) {
    //     return b.version_group_details[0].level_learned_at - a.version_group_details[0].level_learned_at;
    // });
    
    // response.data.moves.forEach(element => {
    //     tbody.innerHTML += '<tr><td>' + element.move.name.charAt(0).toUpperCase() + element.move.name.slice(1) + '</td><td>' + element.version_group_details[0].level_learned_at + '</td></tr>';
    // });
    

    
}
