"use server";

import { GetPokemonService } from "@/services/get-pokemon";
import { PokemonPage } from "@/ui/pokemon-page";
import { Suspense, use } from "react";

interface PageProps {
    params: Promise<{
        name: string
    }>
}

export default async function Page({ params }: PageProps) {

    const { name } = await params
    const pokemon = await GetPokemonService(name)

    return (

        <PokemonPage data={pokemon} />

    )
}