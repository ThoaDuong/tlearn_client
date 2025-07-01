import { useState, useEffect } from "react";

const useDebounce = ({value, delayTime}: {value: string, delayTime: number}) => {
    const [debouncedValue, setDebouncedValue] =  useState<string>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delayTime)

        return () => {
            clearTimeout(timer);
        }
    }, [value, delayTime]);

    return debouncedValue;
}

export default useDebounce;