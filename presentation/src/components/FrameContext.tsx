import { createContext, useContext } from 'react';

export const StaticFrameContext = createContext(false);
export const useStaticFrame = () => useContext(StaticFrameContext);
