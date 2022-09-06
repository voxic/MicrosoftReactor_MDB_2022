var axios = require('axios');
const fs = require('fs');

var config = {
  method: 'get',
  url: 'https://pokeapi.co/api/v2/pokemon/?limit=2000',
  headers: { }
};

axios(config)
.then(function (response) {
    const pokemons = []
    
    const requests = response.data.results.map(pokemon => {
        return axios.get(pokemon.url).then(res => {
            pokemons.push(
                {
                    id: res.data.id,
                    name: res.data.name,  
                    species: res.data.species,
                    sprite: res.data.sprites.front_default,
                    stats: res.data.stats,
                    weight: res.data.weight
                })
        }).catch(()=> console.log("skip"))
    })

    return Promise.all(requests).then(()=>{
        fs.writeFile('pokemons.json', JSON.stringify(pokemons), 'utf8', ()=>{})
    })

})
.catch(function (error) {
  console.log(error);
});


