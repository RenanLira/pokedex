export async function GetPokemonSpeciesService(name: string) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)

    return res.json()
}