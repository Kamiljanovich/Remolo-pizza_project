import React, { useContext } from "react";
import { languages } from "../utils/translate";
import { LanguageContext } from "../utils/dsvsdv";


const useLanguage = () => {
  const { language } = useContext(LanguageContext);
  return (text) => (!!languages[text] ? languages[text][language] : text);
};

export default useLanguage;