"use client";

import { PokebolaSvgComponent } from "@/components/pokebola-svg";
import { SpanTypeComponent } from "@/components/span-type";
import Image from "next/image";


interface PokemonPageProps {
    data: any
}

export function PokemonPage({ data }: PokemonPageProps) {

    return (
        <div className="h-full flex flex-col items-center flex-1 min-w-full absolute z-50 bg-background lg:relative lg:min-w-[420px] rounded-md overflow-hidden bg-red-50">
            <div className="relative flex justify-center items-center w-full min-h-fit overflow-hidden">
                <PokebolaSvgComponent className="absolute w-[76%] left-1/3 rotate-45 -z-10"
                    style={{
                        fill: `var(--type-${data.types[0].type.name})`,
                        opacity: 0.3
                    }}
                />
                <Image src={`https://projectpokemon.org/images/shiny-sprite/${data.name}.gif`} width={10} height={10} alt={data.name} unoptimized className="h-60 w-auto z-10 relative" />
            </div>
            <div className="flex flex-col items-center rounded-lg h-full w-full -mt-5 pt-20 bg-background gap-5"
            >
                <h1 className="text-4xl font-bold">{data.name}</h1>
                <div className="flex space-x-2">
                    {data.types.map((type: any) => (
                        <SpanTypeComponent key={type.type.name} type={type.type.name} />
                    ))}
                </div>
                <div className="flex w-full justify-between">
                    <div className="flex-1 flex flex-col items-center">
                        <span className="text-sm text-gray-500">Height</span>
                        <span className="text-lg font-bold">{data.height}</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                        <span className="text-sm text-gray-500">Weight</span>
                        <span className="text-lg font-bold">{data.weight}</span>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-5">
                    <h2 className="text-2xl font-bold">Abilities</h2>
                    <div className="flex space-x-2">
                        {data.abilities.map((ability: any) => (
                            <span key={ability.ability.name}
                                className="text-xs font-bold bg-yellow-500 rounded-lg p-4">
                                {ability.ability.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}