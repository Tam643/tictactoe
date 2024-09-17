import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Volume2, VolumeX } from "lucide-react"
import {useMusic} from "@/features/app/hooks/useMusic"

export default function MusicPlayer({
    className = "",
}: MusicPlayerProps): JSX.Element {
    const { isPlaying, play, pause } = useMusic(backgroundMusic); 
    const iconClass = "transition-all hover:text-slate-900 dark:text-slate-50 dark:hover:text-slate-50"
    const volumnIcon = cn(iconClass, isPlaying ? "rotate-0 scale-100" : "rotate-90 scale-0 absolute");
    const mutedIcon = cn(iconClass, !isPlaying ? "rotate-0 scale-100" : "rotate-90 scale-0 absolute");
    const toggle = () => isPlaying ? pause() : play();
    return (
        <>
            <Button
                variant="ghost"
                className={className}
                onClick={() => toggle()}
            >
                <Volume2 className={volumnIcon} />
                <VolumeX className={mutedIcon} />
                <span className="sr-only">Toggle music</span>
            </Button>

        </>
    )
}

export type MusicPlayerProps = {
    className?: string,
}
