import Link from "next/link"
import { PropsWithChildren } from "react"


interface ButtonProps extends PropsWithChildren {
    link: string
}

export const ButtonComponent = ({ children, link }: ButtonProps) => {

    return (
        <Link href={link}>
            <div
                className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold shadow-md hover:bg-yellow-500 hover:scale-105  transition-all duration-200"
            >
                {children}
            </div>
        </Link>
    )

}