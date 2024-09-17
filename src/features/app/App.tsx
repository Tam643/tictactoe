import { useMusic } from "./hooks/useMusic";
import backgroundMusic from "@/assets/sounds/35842__anysounds__refpunk-bassline.mp3";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Volume2, VolumeX } from "lucide-react";
import useTheme from "./hooks/useTheme";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";

function App() {
  const { isPlaying, play, pause } = useMusic(backgroundMusic);
  const { toggle: toggleTheme } = useTheme();

  const buttonClass = "absolute hidden md:inline-flex";
  const iconClass = "transition-all hover:text-slate-900 dark:text-slate-50 dark:hover:text-slate-50"
  const volumnIcon = cn(iconClass, isPlaying ? "rotate-0 scale-100" : "rotate-90 scale-0 absolute");
  const mutedIcon = cn(iconClass, !isPlaying ? "rotate-0 scale-100" : "rotate-90 scale-0 absolute");
  const toggleMusic = () => isPlaying ? pause() : play();
  const sunIconClass = cn("rotate-0 scale-100 dark:-rotate-90 dark:scale-0", iconClass);
  const moonIconClass = cn("absolute rotate-90 scale-0 dark:rotate-0 dark:scale-100", iconClass);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <Button
        variant="ghost"
        className={cn(buttonClass, "top-4 right-20")}
        onClick={() => toggleMusic()}
      >
        <Volume2 className={volumnIcon} />
        <VolumeX className={mutedIcon} />
        <span className="sr-only">Toggle music</span>
      </Button>
      <Button
        variant="ghost"
        className={cn(buttonClass, "top-4 right-4")}
        onClick={() => toggleTheme()}
      >
        <Sun className={sunIconClass} />
        <Moon className={moonIconClass} />
        <span className="sr-only">Toggle theme</span>
      </Button>
      <main className="flex flex-col justify-center w-1/2 lg:w-1/3 rounded-lg text-secondary-foreground bg-secondary shadow-lg p-2">
        <Outlet />
      </main>
    </div>
  )
}

export default App
