"use client";

import { InfinityScrollerComponent } from "@/components/infinity-scroller";
import { PokemonCardMemo } from "@/components/pokemon-card";
import { GetPokemonsService } from "@/services/get-pokemons";
import { useInfiniteQuery } from "@tanstack/react-query";

import Link from "next/link";
import { useRef, } from "react";



export function HomePage() {
    const ref = useRef<HTMLDivElement>(null);

    const {
        data,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ["pokemons"],
        queryFn: async ({ pageParam }) => {
            const res = await GetPokemonsService(pageParam);

            return res;
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.next) {
                return allPages.length;
            }
        }
    })



    return (
        <div className="max-w-screen-xl w-full h-full overflow-y-auto overflow-x-hidden"
            ref={ref}
        >

            <InfinityScrollerComponent
                data={data?.pages.flatMap((page: any) => page.results) || []}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
                containerRef={ref}
                isFetchingNextPage={isFetchingNextPage}
                renderCell={(pokemon: any) => (
                    <Link href={`/pokemon/${pokemon.name}`}>
                        <PokemonCardMemo id={pokemon.id} name={pokemon.name} />
                    </Link>
                )}
            />

        </div>
    )
}