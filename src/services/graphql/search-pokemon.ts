import request, { gql, } from "graphql-request";



const query = gql`
    pokemon_v2_pokemon(order_by: {id: asc}, where: {
        name: {
            _regex: $search
        }
    }) {
        id
        name
        height
        pokemon_v2_pokemontypes {
            pokemon_v2_type {
                name
            }
        }
    }

`

export async function SearchPokemonServiceGQL(search: string) {
    return request("https://graphql-pokeapi.vercel.app/api/graphql", query, {
        search
    })
} 