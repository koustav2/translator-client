/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import toast from "react-hot-toast";
import useSWR from "swr";

const fetcher = async (url, options) => {

    const response = await axios.post(url, options);
    if (response.data.success === true) {
        return response.data;
    } else {
        throw new Error(response.error);
    }
};

export default fetcher;

export const detectLanguage = async (textInput) => {
    const response = await axios.post(`${import.meta.env.VITE_CLIENT_API_URI}/detectLanguage`, { textInput });
    return response.data;
}

export const playAudio = async (text, language) => {
    console.log(language);
    try {
        const response = await axios.post(`${import.meta.env.VITE_CLIENT_API_URI}/textToSpeech`, { text, language });
        if (response.data.success === true) {
            const url = response.data.audioUrl;
            const audio = new Audio(url);
            audio.play().catch((error) => {
                console.error("Failed to play audio:", error);
            });

        }
        else {
            console.error(response.error);
            toast.error(response.error);
        }
    } catch (error) {
        console.error(error);
        toast.error("Failed to play audio");
    }

} 