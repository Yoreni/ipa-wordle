import { useEffect, useRef } from "react";

export function useStateRef(stateVarible)
{
    const referance = useRef(stateVarible);
    useEffect(() => {
        referance.current = stateVarible;
    }, [stateVarible]);
    return referance;
}
