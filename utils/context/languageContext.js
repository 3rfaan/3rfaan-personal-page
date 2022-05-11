import { createContext, useEffect, useState } from "react";

export const LanguageContext = createContext();

export const LanguageContextProvider = ({ children }) => {
  const [language, setLanguage] = useState();

  useEffect(() => {
    const storedLanguage =
      JSON.parse(localStorage?.getItem("language")) || "arabic";
    setLanguage(storedLanguage);
  }, []);

  useEffect(() => {
    localStorage?.setItem("language", JSON.stringify(language));
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
