import { createContext, useContext, useEffect, useState } from "react";

const AnalysisContext = createContext();

export const useAnalysis = () => useContext(AnalysisContext);

export const AnalysisProvider = ({ children }) => {
  const [analysisData, setAnalysisData] = useState(() => {
    const saved = localStorage.getItem("analysisResult");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (analysisData) {
      localStorage.setItem(
        "analysisResult",
        JSON.stringify(analysisData)
      );
    }
  }, [analysisData]);

  return (
    <AnalysisContext.Provider
      value={{
        analysisData,
        setAnalysisData,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};