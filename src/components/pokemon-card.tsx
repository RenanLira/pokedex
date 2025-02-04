import { GetPokemonService } from "@/services/get-pokemon"
import { GetPokemonSpeciesService } from "@/services/get-pokemon-species"
import { useQueries } from "@tanstack/react-query"
import { motion } from "motion/react"
import Image from "next/image"
import { memo } from "react"
import { SpanTypeComponent } from "./span-type"


interface PokemonCardProps {
    name: string
    id: number
}



export const PokemonCardComponent = ({ name }: PokemonCardProps) => {


    const [pokemon, species] = useQueries({
        queries: [
            {
                queryKey: ["pokemon", name],
                queryFn: () => GetPokemonService(name)
            },
            {
                queryKey: ["pokemon-species", name],
                queryFn: () => GetPokemonSpeciesService(name)
            }
        ]
    })


    return (
        <>
            {(pokemon.isFetched && species.isFetched) && (
                <motion.div
                    initial={{ translateY: 100, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    whileInView={{ translateY: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className={`flex p-4 h-60 rounded-md shadow-md w-full justify-between bg-white pokemon-card hover:scale-[101%] transition-all duration-200`}>
                    <div className="relative flex justify-center items-center flex-1">
                        <Image
                            src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + pokemon.data?.id + ".png"}
                            width={160}
                            height={122}
                            priority
                            className="z-10 w-auto h-auto"
                            alt={pokemon.data?.name}
                        />
                        <span className={`w-20 h-20 md:w-32 md:h-32 flex absolute rounded-full`} style={{
                            backgroundColor: `var(--${species.data?.color.name})`,

                        }}>
                        </span>
                    </div>
                    <div className="flex-[2] justify-between flex flex-col">
                        <div className="flex justify-between">
                            <div className="flex flex-col gap-2">
                                <h3 className="uppercase font-extrabold text-xl">
                                    {pokemon.data?.name}
                                </h3>
                                <div className="flex gap-2">
                                    {pokemon.data?.types.map((type: any, index: number) => (
                                        <SpanTypeComponent key={index} type={type.type.name} />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <span className="text-sm font-semibold text-gray-600">
                                    #{pokemon.data?.id}
                                </span>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-gray-600">
                                {species.data?.flavor_text_entries.find((entry: any) => entry.language.name === 'en').flavor_text}
                            </p>
                        </div>
                        <div>
                            <span className="text-sm font-semibold text-gray-600">
                                {species.data?.genera[7].genus}
                            </span>
                        </div>
                    </div>
                </motion.div>
            )}
        </>
    )
}

export const PokemonCardMemo = memo(PokemonCardComponent)