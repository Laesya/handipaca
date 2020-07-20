import { createContext, useContext } from 'react';

export const PlaceContext = createContext();

export function usePlace() {
    return useContext(PlaceContext);
}
