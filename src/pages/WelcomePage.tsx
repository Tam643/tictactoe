import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";



interface NavLinks {
    name: string;
    path: string;
}

const links: NavLinks[] = [
    {
        name: "Play with friend Offline",
        path: "/friend"
    },
    {
        name: "Play with computer",
        path: "/noobbot"
    }
];

const WelcomePage = () => {
    
    return (
       <>
            <h1 className="text-2xl text-center font-bold mb-4">Tic-Tac-Toe Game</h1>
            {
                links.map(({ name, path}) => (
                    <Button key={name} variant="destructive" className="w-full mb-2">
                        <Link to={path}>{name}</Link>
                    </Button>
                ))
            }
       </>
    )
}

export default WelcomePage;