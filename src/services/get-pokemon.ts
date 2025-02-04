export async function GetPokemonService(name: string) {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + name)

    return res.json()
}