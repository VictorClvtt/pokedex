const fetchPokemon = async (pokemon) => {

    data = []

    const APIResponse1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const info = await APIResponse1.json()
    data.push(info) //0

    const APIResponse2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`)
    const color = await APIResponse2.json()
    data.push(color) //1

    return data
}

const renderPokemon = async (pokemon) => {

    // Reseta os valores do numero
    document.querySelector('.number').style.background = 'none'
    document.querySelector('.number').style.display = 'none'

    // Reseta os tipos
    document.querySelector('.types').innerHTML = ''
    document.querySelector('.types').style.border = '0'

    // Reseta a descrição
    document.querySelector('.description').innerHTML = ''
    document.querySelector('.description').style.display = 'none'

    // Exibe uma mensagem de loading enquanto as informações são buscadas na API
    document.querySelector('.image').innerHTML = ''
    document.querySelector('.name').innerHTML = 'Loading...'
    document.querySelector('.number').innerHTML = ''

    // Executa a função que pega todos os dados dos pokemons e coloca os dados da função dentro de uma variável interna da função atual
    const data = await fetchPokemon(pokemon)

    // Renderiza a imagem, o nome e o numero do pokemon
    if(data[0].id<650){
        document.querySelector('.image').innerHTML = (`<img src="${data[0]['sprites']['versions']['generation-v']['black-white']['animated']['front_default']}" alt="${data[0]['name']}" class="animated">`)
    }
    else{
        document.querySelector('.image').innerHTML = (`<img src="${data[0]['sprites']['other']['official-artwork']['front_default']}" alt="${data[0]['name']}" class="notAnimated">`)
    }
    
    document.querySelector('.name').innerHTML = data[0]['name'].charAt(0).toUpperCase() + data[0]['name'].slice(1) + ' -'
    document.querySelector('.number').innerHTML = data[0].id

    // Renderiza a cor correspondente ao pokemon no background da tag que contém o número
    document.querySelector('.number').style.display = 'unset'
    document.querySelector('.number').style.background = data[1]['color']['name']

    // Renderiza a descrição do pokemon
    document.querySelector('.description').style.display = 'unset'

    if(data[0].id<650){
        document.querySelector('.description').innerHTML = data[1]['flavor_text_entries'][1]['flavor_text']
    }
    else if(data[0].id>=650 && data[0].id<721){
        document.querySelector('.description').innerHTML = data[1]['flavor_text_entries'][6]['flavor_text']
    }
    else if(data[0].id>=721 && data[0].id<=1010){
        document.querySelector('.description').innerHTML = data[1]['flavor_text_entries'][7]['flavor_text']
    }
    // Renderiza os tipos correspondentes ao pokemon
    for (var type=0; type<=data[0]['types'].length; type++){
        document.querySelector('.types').style.border = '1px solid black'
        var pkmn = data[0]['types'][type]['type']['name']
        document.querySelector('.types').innerHTML += `<span id="${pkmn}">${pkmn.toUpperCase()}</span>`
    }
    
}

function inputPokemon() {

    input = document.getElementById('input').value
    input = input.toLowerCase()

    if (input<1 || input>1010){
        document.getElementById('input').style.color = 'red'
    }
    else{
        document.getElementById('input').style.color = 'black'
        renderPokemon(input)
        document.getElementById('input').value = ''
    }
}

function indexPlusOne() {

    index = document.querySelector('.number').innerHTML
    index++

    return renderPokemon(index)

}

function indexMinusOne() {

    index = document.querySelector('.number').innerHTML
    index--

    return renderPokemon(index)

}