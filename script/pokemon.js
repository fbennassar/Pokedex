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


}