import * as React from 'react';

const EuiIconLogoAwsMono = ({ title, titleId, ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g fillRule="evenodd">
      <path
        fillRule="nonzero"
        d="M9.019 13.878c0 .39.042.705.117.936.085.232.191.484.34.758a.454.454 0 01.075.242c0 .105-.064.21-.202.315l-.67.442a.514.514 0 01-.277.095c-.107 0-.213-.053-.32-.148a3.258 3.258 0 01-.383-.494 8.109 8.109 0 01-.33-.62c-.83.967-1.873 1.45-3.128 1.45-.894 0-1.607-.252-2.129-.756-.521-.505-.787-1.178-.787-2.02 0-.894.319-1.62.968-2.166.65-.547 1.511-.82 2.607-.82.362 0 .735.03 1.128.083.394.053.799.137 1.224.232v-.768c0-.8-.17-1.357-.5-1.683-.34-.326-.915-.484-1.735-.484-.372 0-.755.043-1.149.137-.394.095-.777.21-1.15.358-.17.073-.297.115-.372.136a.66.66 0 01-.17.032c-.149 0-.223-.105-.223-.326v-.515c0-.169.02-.295.074-.368a.796.796 0 01.298-.221c.373-.19.82-.347 1.34-.474a6.524 6.524 0 011.661-.2c1.266 0 2.192.285 2.788.852.586.568.884 1.43.884 2.588v3.407h.02zm-4.32 1.6c.35 0 .712-.064 1.095-.19a2.373 2.373 0 001.011-.673c.17-.2.298-.421.362-.673.064-.253.107-.558.107-.916v-.441a8.982 8.982 0 00-.98-.179 8.113 8.113 0 00-1-.063c-.713 0-1.234.137-1.586.42-.35.285-.521.684-.521 1.21 0 .494.128.862.394 1.115.255.263.628.39 1.117.39zm8.545 1.135c-.192 0-.32-.032-.405-.105-.085-.063-.16-.21-.223-.41l-2.501-8.13c-.064-.21-.096-.347-.096-.421 0-.168.085-.263.256-.263h1.043c.202 0 .34.032.415.105.085.063.149.21.212.41l1.788 6.963 1.66-6.963c.054-.21.117-.347.203-.41.085-.063.234-.105.425-.105h.852c.202 0 .34.032.425.105.085.063.16.21.203.41l1.681 7.047 1.841-7.047c.064-.21.138-.347.213-.41.085-.063.223-.105.415-.105h.99c.17 0 .266.084.266.263 0 .052-.011.105-.022.168-.01.063-.032.147-.074.263l-2.565 8.13c-.064.21-.138.347-.223.41-.085.063-.224.105-.405.105h-.915c-.202 0-.34-.031-.426-.105-.085-.073-.16-.21-.202-.42l-1.65-6.784-1.638 6.773c-.053.21-.117.347-.202.42-.086.074-.235.106-.426.106h-.915zm13.675.284a7.122 7.122 0 01-1.64-.19c-.531-.126-.946-.262-1.223-.42-.17-.095-.287-.2-.33-.295a.735.735 0 01-.064-.294v-.536c0-.221.085-.327.245-.327a.61.61 0 01.192.032c.063.021.16.063.266.105.361.158.755.284 1.17.368.426.084.84.127 1.267.127.67 0 1.192-.116 1.553-.348a1.13 1.13 0 00.554-.999c0-.294-.096-.536-.288-.736-.191-.2-.553-.379-1.074-.547l-1.544-.473c-.776-.242-1.351-.6-1.702-1.073a2.487 2.487 0 01-.532-1.525c0-.442.095-.83.287-1.167.192-.337.447-.631.766-.863.32-.242.681-.42 1.107-.547a4.69 4.69 0 011.34-.178c.235 0 .48.01.714.042.245.031.468.073.692.115.212.053.415.105.606.169.192.063.34.126.447.189a.918.918 0 01.32.263c.063.084.095.2.095.347v.494c0 .221-.085.337-.245.337-.085 0-.223-.042-.404-.126-.607-.274-1.288-.41-2.043-.41-.607 0-1.086.094-1.416.294-.33.2-.5.505-.5.936 0 .294.107.547.32.747.212.2.606.4 1.17.578l1.511.473c.766.242 1.32.579 1.65 1.01.33.431.49.926.49 1.473 0 .452-.096.862-.277 1.22a2.836 2.836 0 01-.777.925c-.33.263-.724.452-1.182.59-.478.146-.979.22-1.521.22z"
      />
      <path d="M28.93 22.009c-3.501 2.556-8.588 3.912-12.962 3.912-6.13 0-11.653-2.24-15.825-5.963-.33-.295-.032-.694.362-.463 4.512 2.587 10.078 4.155 15.836 4.155 3.884 0 8.151-.8 12.078-2.44.586-.263 1.086.378.511.799z" />
      <path d="M30.388 20.368c-.447-.568-2.958-.273-4.097-.137-.34.042-.394-.252-.085-.473 2-1.388 5.289-.989 5.672-.526.383.474-.107 3.723-1.98 5.28-.287.242-.564.116-.436-.2.426-1.041 1.373-3.386.926-3.944z" />
    </g>
  </svg>
);

export const icon = EuiIconLogoAwsMono;
