"use client";

export async function GetPokemonsService(page: number) {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=40&offset=" + page * 25)

    return res.json()
}
