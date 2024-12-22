import { useEffect, useRef } from 'react'
import { RiArrowDropDownLine } from 'react-icons/ri'
import LanguageSelector from './LanguageSelector';
import { languageChangeSelector, textInputAtom } from '../state/recoil/recoil';
import { useRecoilState } from 'recoil';
import { handleCopy, handleCountryChange, setLanguageByNameOrCode } from '../utils/utils';
import useDebouncedTranslate from '../utils/customHooks/useDebouncedTranslate';
import { playAudio } from '../utils/fetcher';
function RightTranslatorCmp() {
  const [selectedLanguage, setLanguage] = useRecoilState(languageChangeSelector("right"));
  const [textInput, setTextInput] = useRecoilState(textInputAtom("right"));
  const [leftSelectedLanguage] = useRecoilState(languageChangeSelector("left"));
  const [leftTextInput] = useRecoilState(textInputAtom("left"));
  const textInputRef = useRef(textInput);

  useEffect(() => {
    textInputRef.current = textInput;
  }, [textInput]);


  const debouncedTranslateData = useDebouncedTranslate(leftSelectedLanguage, setTextInput);

  const onClickTranslate = (e) => {
    const lng = e.target.getAttribute('data-value');
    const clickedLanguage = { code: lng };
    setLanguageByNameOrCode(lng, setLanguage);
    debouncedTranslateData(leftTextInput, clickedLanguage, (translatedText, error) => {
      if (error) {
        console.warn('Translation error:', error);
      } else {
        console.log('Translated text:', translatedText);
      }
    });
  };



  return (
    <div className="elm_box bg-[#0c1223d2] px-6">
      <div className='items-center justify-between section_1'>
        <div className='clicked flex gap-[35px]'>
          <div data-value="bn" onClick={(e) => { onClickTranslate(e) }} className={`'relative flex items-center cursor-pointer z-2' ${selectedLanguage && selectedLanguage.code === "bn" ? "selected" : ""}`} >Bengali</div>
          <div
            className={`'relative flex items-center cursor-pointer z-2' ${selectedLanguage && selectedLanguage.code === "fr" ? "selected" : ""}`}
            data-value="fr"
            onClick={(e) => { onClickTranslate(e) }}
          >France</div>
          <div className='relative flex items-center z-2 '>
            <div className='flex'>
              <span>{selectedLanguage ? selectedLanguage.name : "Spanish"}</span>
              <RiArrowDropDownLine />
            </div>
            <div className='absolute left-0 z-0'>
              <LanguageSelector key={selectedLanguage} value={selectedLanguage} onChange={(value) => handleCountryChange(setLanguage, value)} />
            </div>
          </div>
        </div>
        {/* <div className='border-2 rounded-2xl border-[#4D5562] p-2 cursor-pointer'>
          <img src="/assets/Horizontal_top_left_main.svg" alt="language_reverse_svg" />
        </div> */}
      </div>
      <div className='h-[12em] w-100 py-3'>
        <textarea
          onPaste={(e) => e.preventDefault()}
          value={textInput}
          className="w-full h-full text-lg bg-transparent border-0 resize-none focus:outline-none text-slate-200"
          placeholder="Enter text to translate"
        />
      </div>
      <div className='flex gap-3 py-4'>
        {['/assets/sound_max_fill.svg', '/assets/Copy.svg'].map((src, idx) => (
          <div
            key={idx}
            className="border-2 rounded-2xl border-[#4D5562] p-2"
            onClick={() => {
              if (idx === 0) {
                playAudio(textInput,selectedLanguage.code);
                console.log("Sound icon clicked");
              } else if (idx === 1) {
                handleCopy(textInput);
              }
            }}
          >
            <img src={src} alt={idx === 0 ? 'sound_icon' : 'copy_icon'} className="cursor-pointer" />
          </div>
        ))}

      </div>
    </div>
  )
}

export default RightTranslatorCmp