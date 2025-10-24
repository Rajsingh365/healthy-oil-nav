import React, { createContext, useContext, useState, ReactNode } from "react";

interface PointsContextType {
  totalPoints: number;
  addPoints: (points: number) => void;
  deductPoints: (points: number) => void;
  setPoints: (points: number) => void;
}

const PointsContext = createContext<PointsContextType | undefined>(undefined);

export const PointsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [totalPoints, setTotalPoints] = useState(1850);

  const addPoints = (points: number) => {
    setTotalPoints((prev) => prev + points);
  };

  const deductPoints = (points: number) => {
    setTotalPoints((prev) => Math.max(0, prev - points));
  };

  const setPoints = (points: number) => {
    setTotalPoints(points);
  };

  return (
    <PointsContext.Provider
      value={{ totalPoints, addPoints, deductPoints, setPoints }}
    >
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (context === undefined) {
    throw new Error("usePoints must be used within a PointsProvider");
  }
  return context;
};
