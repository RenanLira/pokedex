"use client";

import { useVirtualizer } from "@tanstack/react-virtual";
import { ReactNode, useEffect, } from "react";

interface InfinityScrollerProps {
    data: any[];
    hasNextPage: boolean;
    fetchNextPage: () => void;
    isFetchingNextPage: boolean;
    containerRef: React.RefObject<HTMLDivElement | null>;
    renderCell: (cell: any) => ReactNode;
}

export const InfinityScrollerComponent = ({ data: allPokemons, hasNextPage, fetchNextPage, containerRef, renderCell, isFetchingNextPage }: InfinityScrollerProps) => {


    const rowVirtualizer = useVirtualizer({
        count: hasNextPage ? allPokemons.length + 1 : allPokemons.length,
        estimateSize: () => 200,
        overscan: 5,
        getScrollElement: () => containerRef.current!,
    })

    useEffect(() => {
        const listVirtual = rowVirtualizer.getVirtualItems()

        const lastItem = listVirtual[listVirtual.length - 1]

        if (!lastItem) {
            return
        }

        if (
            lastItem.index >= allPokemons.length - 1 &&
            hasNextPage &&
            !isFetchingNextPage
        ) {
            console.log('fetching next page')
            fetchNextPage()
        }


    }, [allPokemons.length, fetchNextPage, hasNextPage, isFetchingNextPage, rowVirtualizer.getVirtualItems(), rowVirtualizer])




    return (
        <>
            <div
                style={{
                    height: `${rowVirtualizer.getTotalSize()}px`,
                    width: '100%',
                    position: 'relative',
                }}
            >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                    const isLoaderRow = virtualRow.index > allPokemons.length - 1
                    const post = allPokemons[virtualRow.index]

                    return (
                        <div
                            key={virtualRow.index}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: `${virtualRow.size}px`,
                                transform: `translateY(${virtualRow.start}px)`,
                            }}
                        >
                            {isLoaderRow
                                ? hasNextPage
                                    ? 'Loading more...'
                                    : 'Nothing more to load'
                                : renderCell(post)}
                        </div>
                    )
                })}
            </div>
        </>
    )
}