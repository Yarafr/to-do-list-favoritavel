import { createContext } from "react";
import type { FavoritesProvider } from "./FavoritesProvider";

export const FavoritesContext = createContext<FavoritesProvider | undefined>(undefined);