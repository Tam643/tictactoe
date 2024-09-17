import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useTheme from "@/features/app/hooks/useTheme";

type ThemeChangerProps = {
    className?: string,
    isToggle?: boolean
}

const DropdownTheme = ({
    children,
}: {
    children: React.ReactNode,
}): JSX.Element => {
    const { changeTheme } = useTheme();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {
                    children
                }
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => changeTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const ThemeChanger = ({
    className = "",
    isToggle = true,
}: ThemeChangerProps) => {
    const { toggle } = useTheme();
    const iconClass = "transition-all hover:text-slate-900 dark:text-slate-50 dark:hover:text-slate-50"
    const sunIconClass = cn("rotate-0 scale-100 dark:-rotate-90 dark:scale-0", iconClass);
    const moonIconClass = cn("absolute rotate-90 scale-0 dark:rotate-0 dark:scale-100", iconClass);
    return (
        <>
        {isToggle ? (
            <Button
                variant="ghost"
                className={className}
                onClick={() => toggle()}
            >
                <Sun className={sunIconClass} />
                <Moon className={moonIconClass} />
                <span className="sr-only">Toggle theme</span>
            </Button>
        ) : (
            <DropdownTheme>
                <Button
                    variant="ghost"
                    className={className}
                >
                    <Sun className={sunIconClass} />
                    <Moon className={moonIconClass} />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownTheme>
        )

        }
    </>
    );
}

export default ThemeChanger;