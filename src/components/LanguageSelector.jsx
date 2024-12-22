/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import Select, { components } from 'react-select';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { LanguageList } from '../utils/languageList'; // Import language list

// Custom component to show the dropdown icon
const DropdownIndicator = (props) => {
    return (
        <components.DropdownIndicator {...props}>
            <RiArrowDropDownLine size={24} />
        </components.DropdownIndicator>
    );
};

function LanguageSelector({ value, onChange }) {
    const options = useMemo(() => LanguageList, []);

    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: 'transparent',
            border: 'none',
            boxShadow: 'none',
            width: '100px',
        }),
        singleValue: () => ({
            display: 'none',
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: '#333',
            color: '#fff',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '' : '#333', 
            color: '#5e5b5b',
            '&:hover': {
                backgroundColor: '#aca7a7',
            },
        }),
    };

    return (
        <Select
            value={value}
            options={options}
            onChange={onChange}
            placeholder=""
            styles={customStyles}
            components={{ DropdownIndicator }} 
            isSearchable={false}
            isClearable={false}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.code}
        />
    );
}

export default LanguageSelector;
