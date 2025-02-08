"use client";

import { PokemonCardMemo } from "@/components/pokemon-card";
import { GetPokemonsService } from "@/services/get-pokemons";
import { useInfiniteQuery } from "@tanstack/react-query";

import Link from "next/link";
import { useEffect, useRef, } from "react";



export function HomePage() {
    const ref = useRef<HTMLDivElement>(null);

    const {
        data,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
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




    useEffect(() => {
        const currentRef = ref.current;

        if (currentRef) {
            const handleScroll = () => {
                const scrollStep =
                    (currentRef.scrollTop ?? 0) + (currentRef.clientHeight ?? 0) >= (currentRef.scrollHeight ?? 0) * 0.8;

                if (scrollStep && !isFetchingNextPage && hasNextPage) {
                    fetchNextPage();
                }
            };

            currentRef.addEventListener("scroll", handleScroll);

            return () => {
                currentRef.removeEventListener("scroll", handleScroll);
            };
        }
    }, [ref, isFetchingNextPage, hasNextPage, fetchNextPage])



    return (
        <div className="max-w-screen-xl w-full scrollbar overflow-hidden"
            ref={ref}
            style={{
                overflowY: "scroll",
                height: "100%"
            }}
        >
            <div className="grid  md:grid-cols-[repeat(auto-fit,minmax(420px,1fr))] gap-4"
            >
                {data?.pages.map((page: any) => (
                    page.results.map((pokemon: any, index: number) => (
                        <Link href={`/pokemon/${pokemon.name}`} key={index}>
                            <PokemonCardMemo id={pokemon.id} name={pokemon.name} key={index} />
                        </Link>
                    ))
                ))}
            </div>

        </div>
    )
}