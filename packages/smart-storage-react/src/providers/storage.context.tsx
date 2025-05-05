import { createContext } from "react";
import { StorageContextType } from "./storage-context.type";

export const StorageContext = createContext<StorageContextType>(null!);
