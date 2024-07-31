'use client'
import { useEffect } from "react";
import useLocalStorage from "./useLocalStorages";
import { useDispatch } from 'react-redux'
import { addColor } from "@/redux/darkmodeSlice";

const useColorMode = () => {
    const [colorMode, setColorMode] = useLocalStorage("color-theme", "light");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(addColor(colorMode));
    }, [colorMode]);

    useEffect(() => {
        const className = "dark";

        if (typeof window !== 'undefined') {
            const bodyClass = window.document.body.classList;

            colorMode === "dark"
                ? bodyClass.add(className)
                : bodyClass.remove(className);
        }
    }, [colorMode]);

    return [colorMode, setColorMode];
};

export default useColorMode;
