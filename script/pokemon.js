async function getPokemon() {

    var url = window.location.search;
    const urlParams = new URLSearchParams(url);
    var code = urlParams.get('code');
    console.log(code);

    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${code}`);

    console.log(response.data);

    document.getElementById('name').innerHTML = response.data.name.charAt(0).toUpperCase() + response.data.name.slice(1);

    document.getElementById('sprite').src = response.data.sprites.front_default;

    document.getElementById('backSprite').src = response.data.sprites.back_default;

    document.getElementById('height').innerHTML = response.data.height + ' cm';

    document.getElementById('weight').innerHTML = response.data.weight + ' g';

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

    var moves = document.getElementById('moves');

    response.data.moves.forEach(element => {
        moves.innerHTML += element.move.name.charAt(0).toUpperCase() + element.move.name.slice(1) + "<br>";
    });
    

    // push de mi pc
}