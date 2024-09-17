import { useEffect } from "react";
import { setTheme, theme, toggleTheme } from "@/features/app/appSlice";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { isDayTime } from "@/lib/datetime";

const useTheme = () => {
    const theme = useSelector((state: RootState) => state.app.theme);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const root = window.document.documentElement
        const themeClass = theme === "system" ? isDayTime() ? "light" : "dark" : theme;
        root.classList.remove("light", "dark");
        root.classList.add(themeClass);
    }, [theme]);

    const toggle = () => {
        dispatch(toggleTheme());
    };

    const changeTheme = (newTheme: theme) => {
        dispatch(setTheme(newTheme));
    };

    return { theme, toggle, changeTheme };
};

export default useTheme;