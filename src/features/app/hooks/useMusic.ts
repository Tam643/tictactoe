import { RootState } from "@/store";
import { useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { pauseBackgroundMusic, playBackgroundMusic, setBackgroundVolume } from "../appSlice";

export const useMusic = (audioSrc: string) => {
    const dispatch = useDispatch();
    const isPlaying = useSelector((state: RootState) => state.app.backgroundMusic.isPlaying);
    const volume = useSelector((state: RootState) => state.app.backgroundMusic.volume);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio(audioSrc);
        audioRef.current.preload = "auto";
        audioRef.current.volume = volume;
        audioRef.current.loop = true;
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const play = useCallback(() => {
        dispatch(playBackgroundMusic());
    }, [dispatch]);

    const pause = useCallback(() => {
        dispatch(pauseBackgroundMusic());
    }, [dispatch]);

    const changeVolume = useCallback((volume: number) => {
        dispatch(setBackgroundVolume(Math.max(0, Math.min(1, volume))));
    }, [dispatch]);

    return { play, pause, changeVolume, isPlaying, volume };

};
