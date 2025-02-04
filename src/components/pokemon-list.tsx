import { PokemonCardComponent } from "./pokemon-card"



interface PokemonListProps {
    data: {
        results: any[]
    }
}
export const PokemonListComponent = ({ data }: PokemonListProps) => {



    return (
        <div
            className="grid grid-cols-[repeat(auto-fit,minmax(433px,1fr))] gap-4 px-16"
        >
            {data.results.map((pokemon: any, index: number) => (
                <PokemonCardComponent id={pokemon.id} name={pokemon.name} key={index} />
            ))}
        </div>
    )
}