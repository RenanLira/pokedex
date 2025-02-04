import { PokebolaSvgComponent } from "@/components/pokebola-svg";

export default function Loading() {
    return (
        <div
            className="flex justify-center items-center min-w-full absolute z-50 bg-background lg:relative lg:min-w-[420px] h-full p-10"
        >

            <PokebolaSvgComponent className="w-full animate-spin"
                style={{
                    fill: `var(--type-normal)`,
                    opacity: 0.3
                }}
            />

        </div>
    )
}