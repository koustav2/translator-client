/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useRecoilState } from 'recoil';
import { toast } from 'react-hot-toast';
import { handleClick, handleCopy, handleCountryChange, setLanguageByNameOrCode } from '../utils/utils';
import useDebouncedTranslate from '../utils/customHooks/useDebouncedTranslate';
import { languageChangeSelector, textInputAtom } from '../state/recoil/recoil';
import LanguageSelector from './LanguageSelector';
import { detectLanguage, playAudio } from '../utils/fetcher';

function LeftTranslatorCmp() {
  const [selectedLanguage, setLanguage] = useRecoilState(languageChangeSelector("left"));
  const [rightSelectedLanguage, setRightSelectedLanguage] = useRecoilState(languageChangeSelector("right"));
  const [textInput, setTextInput] = useRecoilState(textInputAtom("left"));
  const [, setRightTextInput] = useRecoilState(textInputAtom("right"));
  const [loading, setLoading] = React.useState(false);
  const textInputRef = useRef(textInput);

  useEffect(() => {
    textInputRef.current = textInput;
  }, [textInput]);


  const debouncedTranslateData = useDebouncedTranslate(selectedLanguage, setRightTextInput, setRightSelectedLanguage);
  const handleInputChange = async (e) => {
    const value = e.target.value;
    if (value.length === 0) {
      setTextInput('');
      setRightTextInput('');
      setLanguage(null);
    }
    if (value.length > 500) {
      toast.error("Text exceeds 500 characters limit.");
    }
    else {
      setTextInput(value);
      setRightTextInput(value ? 'Translating...' : '');
      if (value && value.length >= 4) {
        const response = await detectLanguage(value);
        if (response) {
          const code = response.detectedLanguage;
          if (code) {
            setLanguageByNameOrCode(code, setLanguage)
          }
          else {
            setLanguage(null);
          }
        }
        else {
          setLanguage(null);
        }
      }
      debouncedTranslateData(value, rightSelectedLanguage);
    }
  };
  const handlePaste = (e) => {
    const paste = (e.clipboardData || window.Clipboard).getData('text');
    if (textInput.length + paste.length > 500) {
      e.preventDefault();
      toast.error("Text exceeds 500 characters limit.");
    }
  };

  return (
    <div className="elm_box bg-[#212936db] px-6 py-4">
      <div className="section_1">
        <div
          className='relative flex items-center cursor-pointer z-2'
          data-value="auto"

        >
          {selectedLanguage?.name ? `${selectedLanguage?.name} - Detected` : "Detect Language"}
        </div>
        <div
          className='relative flex items-center cursor-pointer z-2'
          data-value="en"
        >English</div>
        <div
          className='relative flex items-center cursor-pointer z-2'
          data-value="fr"
        >France</div>
        <div className="relative flex items-center z-2">
          <div className="flex">
            <span>{selectedLanguage?.name || "Spanish"}</span>
            <RiArrowDropDownLine />
          </div>
          <div className="absolute left-0 z-0">
            <LanguageSelector
              key={selectedLanguage}
              value={selectedLanguage}
              onChange={(value) => handleCountryChange(setLanguage, value)}
            />
          </div>
        </div>
      </div>
      <div className="h-[12em] w-full py-3">
        <textarea
          value={textInput}
          onChange={handleInputChange}
          onPaste={handlePaste}
          maxLength={500}
          className="w-full h-full text-lg bg-transparent border-0 resize-none focus:outline-none text-slate-200"
          placeholder="Enter text to translate"
        />
      </div>
      <div className="flex items-center justify-between py-4">
        <div className="flex gap-3">
          {['/assets/sound_max_fill.svg', '/assets/Copy.svg'].map((src, idx) => (
            <div
              key={idx}
              className="border-2 rounded-2xl border-[#4D5562] p-2"
              onClick={() => {
                if (idx === 0) {
                  // Functionality for sound icon
                  playAudio(textInput, selectedLanguage?.code);
                  console.log("Sound icon clicked");
                  // Call your function for sound icon here
                } else if (idx === 1) {
                  handleCopy(textInput);
                }
              }}
            >
              <img src={src} alt={idx === 0 ? 'sound_icon' : 'copy_icon'} className="cursor-pointer" />
            </div>
          ))}

        </div>
        <button
          className="text-white bg-[#3662E3] flex px-6 py-3 gap-2 rounded-xl"
          onClick={() => handleClick(setLoading, debouncedTranslateData, textInput, rightSelectedLanguage)}
        >
          {loading ?
            <div
              className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
              role="status">
              <span className="sr-only" >Loading...</span>
            </div>
            : <>
              <img src="/assets/Sort_alfa.svg" alt="translate_icon" />
              <span>Translate</span>
            </>}
        </button>
      </div>
    </div>
  );
}

export default LeftTranslatorCmp;
