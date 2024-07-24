import React from "react";

export const CodeIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    shape-rendering="geometricPrecision"
    text-rendering="geometricPrecision"
    image-rendering="optimizeQuality"
    fill-rule="evenodd"
    clip-rule="evenodd"
    viewBox="0 0 485 512.03"
    {...props}
  >
    <path fill="#3E270F" d="m0 120.11 30.14 92.07v261.24c0 21.23 17.38 38.61 38.61 38.61h377.64c21.22 0 38.61-17.39 38.61-38.62V206.32H50.61l48.8-13.96-33.77-90.89L0 120.11zm139.25 60.85 78.91-22.58-33.69-90.65-75.87 21.54 30.65 91.69zm118.85-34 89.09-25.49-33.6-90.41-86.06 24.44 30.57 91.46zm128.95-36.89 66.07-18.91L422.99 0l-66.43 18.86 30.49 91.21z"/>
    <path fill="#2B1808" fill-rule="nonzero" d="M79.66 249.65h355.81c6.16 0 11.15 4.99 11.15 11.15v163.09c0 13.68-5.61 26.12-14.62 35.14l-.71.64c-8.97 8.63-21.13 13.98-34.43 13.98H118.27c-13.68 0-26.13-5.6-35.14-14.62-9.01-9.01-14.61-21.45-14.61-35.14V260.8c0-6.16 4.99-11.15 11.14-11.15z"/>
    <path fill="#E44F18" d="M79.66 260.8h355.81v163.09c0 21.2-17.41 38.61-38.61 38.61H118.27c-21.2 0-38.61-17.37-38.61-38.61V260.8z"/>
    <path fill="#3E270F" d="M321.85 377.69c9.05-5.85 9.04-12.37 0-17.54l-.55-.32c1.87 3.86-.17 7.98-6.12 11.83l-92.81 53.61c-3.01 1.66-5.7 2.42-7.95 2.27 1.98 6.5 7.33 7.78 14.62 3.77l92.81-53.62z"/>
    <path fill="#FFCE54" d="M315.18 371.66c9.06-5.85 9.05-12.38 0-17.55l-93.62-53.81c-7.39-4.64-15.1-1.91-14.89 7.74l.3 108.76c.63 10.44 6.61 13.32 15.4 8.47l92.81-53.61z"/>
  </svg>
);


export const HamburgetMenuOpen = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill="rgba(255, 255, 255, 0)" d="M0 0h24v24H0z" />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 17h18M3 12h18M3 7h18"
    />
  </svg>
);

export const HamburgetMenuClose = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill="rgba(255, 255, 255, 0)" d="M0 0h24v24H0z" />
    <g fill="none" fillRule="evenodd">
      <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01-.184-.092Z" />
      <path
        fill="currentColor"
        d="m12 14.121 5.303 5.304a1.5 1.5 0 0 0 2.122-2.122L14.12 12l5.304-5.303a1.5 1.5 0 1 0-2.122-2.121L12 9.879 6.697 4.576a1.5 1.5 0 1 0-2.122 2.12L9.88 12l-5.304 5.303a1.5 1.5 0 1 0 2.122 2.122L12 14.12Z"
      />
    </g>
  </svg>
);
