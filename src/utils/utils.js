import toast from "react-hot-toast";
import { LanguageList } from "./languageList";

export const handleCountryChange = (setLanguage, value) => {
    setLanguage(value);
};

export const handleTextInputChange = (fn, value) => {
    fn(value);
};
export const setLanguageByNameOrCode = (value, setLanguage) => {
    console.log(setLanguage);
    const language = LanguageList.find(
        lang => lang.name === value || lang.code === value
    );
    if (language) {
        setLanguage(language);
        
    } else {
        console.error("Language not found");
    }
};

export const handleClick = (setLoading, debouncedTranslateData, textInput, rightSelectedLanguage) => {
    setLoading(true);
    debouncedTranslateData(textInput, rightSelectedLanguage, (translatedText, error) => {
        setLoading(false);
        if (error) {
            toast.error(error);
        } else {
            console.log('Successfull')
        }
    });
};

export const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        toast.success("Text copied to clipboard");
    });
};
