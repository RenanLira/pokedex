"use client";

import { PokemonCardComponent, PokemonCardMemo } from "@/components/pokemon-card";
import { GetPokemonsService } from "@/services/get-pokemons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useScroll } from "motion/react";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";



export function HomePage() {
    const ref = useRef<HTMLDivElement>(null);

    const {
        data,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
        isFetched
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

        if (ref.current) {
            ref.current.addEventListener("scroll", () => {
                const scrollStep = ref.current?.scrollTop! + ref.current?.clientHeight! >= ref.current?.scrollHeight! * 0.8;

                if (scrollStep && !isFetchingNextPage && hasNextPage) {
                    fetchNextPage();
                }
            })

            return () => {
                ref.current?.removeEventListener("scroll", () => { })
            }
        }
    }, [ref, isFetchingNextPage, hasNextPage])



    return (
        <div className="max-w-screen-xl w-full p-4 scrollbar overflow-hidden"
            ref={ref}
            style={{
                overflowY: "scroll",
                height: "100%"
            }}
        >
            <div className="grid grid-cols-[repeat(auto-fit,minmax(420px,1fr))] gap-4"
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