import { ButtonComponent } from "./button"


export const HeaderComponent = () => {
    return (
        <header className="bg-red-500 w-full h-24 px-6 flex items-center justify-between text-white shadow-lg border-b-4 border-black">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white border-4 border-black rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                </div>
                <h1 className="text-4xl font-extrabold tracking-wide drop-shadow-md">Pokédex</h1>
            </div>
            <nav>
                <ul className="flex gap-5">
                    <li>
                        <ButtonComponent link="#">
                            Github
                        </ButtonComponent>
                    </li>
                </ul>
            </nav>
        </header>


    )
}