/* eslint-disable no-unused-vars */
// src/hooks/useDebouncedTranslate.js
import { useCallback, useRef, useEffect } from 'react';
import { debounce } from 'lodash';
import fetcher from '../fetcher';
import { toast } from 'react-hot-toast';
import { setLanguageByNameOrCode } from '../../utils/utils';

const useDebouncedTranslate = (selectedLanguage, setRightTextInput, setRightSelectedLanguage) => {
  const textInputRef = useRef('');

  useEffect(() => {
    textInputRef.current = textInputRef;
  }, [textInputRef]);

  const debouncedTranslateData = useCallback(
    debounce(async (textInput, rightSelectedLanguage, callback) => {
      if (!textInput || textInput.length < 2) {
        setRightTextInput('');
        return;
      }
      try {
        const data = await fetcher(`${import.meta.env.VITE_CLIENT_API_URI}/translate`, {
          text: textInput,
          sourceLanguage: selectedLanguage?.code || 'en',
          targetLanguage: rightSelectedLanguage?.code || 'es',
        });

        if (data?.success) {
          setRightTextInput(data.translatedtext);
          if(setRightSelectedLanguage)setLanguageByNameOrCode(rightSelectedLanguage?.code || 'es', setRightSelectedLanguage);
          if (callback) callback(data.translatedtext, null);
        } else {
          setRightTextInput('');
          toast.error('Translation failed: Server returned an error.');
          if (callback) callback(null, 'Translation failed');
        }
      } catch (error) {
        console.error('Error during translation:', error); // Improved debugging
        setRightTextInput('');
        toast.error('Failed to translate the text due to a network or server issue.');
        if (callback) callback(null, 'Failed to translate the text');
      }
    }, 400),
    [selectedLanguage, setRightTextInput, setRightSelectedLanguage]
  );

  return debouncedTranslateData;
};

export default useDebouncedTranslate;
