import React from "react";
import Select, { StylesConfig } from "react-select";


type GenreOption = {
  value: string;
  label: string;
};


const genreOptions: GenreOption[] = [
  { value: 'action', label: 'Action' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'animation', label: 'Animation' },
  { value: 'biography', label: 'Biography' },
  { value: 'comedy', label: 'Comedy' },
  { value: 'crime', label: 'Crime' },
  { value: 'documentary', label: 'Documentary' },
  { value: 'drama', label: 'Drama' },
  { value: 'family', label: 'Family' },
  { value: 'fantasy', label: 'Fantasy' },
  { value: 'history', label: 'History' },
  { value: 'horror', label: 'Horror' },
  { value: 'music', label: 'Music' },
  { value: 'musical', label: 'Musical' },
  { value: 'mystery', label: 'Mystery' },
  { value: 'romance', label: 'Romance' },
  { value: 'sci-fi', label: 'Sci-Fi' },
  { value: 'sport', label: 'Sport' },
  { value: 'thriller', label: 'Thriller' },
  { value: 'war', label: 'War' },
  { value: 'western', label: 'Western' },
 
];


const genreStyles: StylesConfig<GenreOption, true> = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { isDisabled, isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isDisabled
      ? undefined
      : isSelected
      ? '#e0e0e0' 
      : isFocused
      ? '#f0f0f0' 
      : undefined,
    color: isDisabled
      ? "#ccc"
      : isSelected
      ? "black"
      : "black",
    cursor: isDisabled ? "not-allowed" : "default",

    ":active": {
      ...styles[":active"],
      backgroundColor: !isDisabled
        ? isSelected
          ? '#d0d0d0' 
          : '#e0e0e0' 
        : undefined,
    },
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: '#f0f0f0', 
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: 'black',
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: 'black',
    ":hover": {
      backgroundColor: '#d0d0d0',
      color: 'black',
    },
  }),
};

// Create and export the component
const GenreSelect = () => (
  <Select
    closeMenuOnSelect={false}
    defaultValue={[genreOptions[0], genreOptions[1]]}
    isMulti
    options={genreOptions}
    styles={genreStyles}
  />
);

export default GenreSelect;
