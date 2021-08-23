import * as React from 'react';

const EuiIconCheer = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M4.934 3.063a1.5 1.5 0 01.547.321l.112.115 6.07 6.915a1.5 1.5 0 01-.646 2.41l-.142.04-9.031 2.097A1.5 1.5 0 01.037 13.19l.043-.159L3.04 4.02a1.5 1.5 0 011.893-.957zM4.027 4.25l-.036.083-2.961 9.011a.5.5 0 00.498.656l.09-.013 2.937-.681-1.399-1.508a.5.5 0 01.666-.74l.067.06 1.788 1.927 2.634-.611-3.198-3.601a.5.5 0 01.682-.726l.066.062 3.559 4.007 1.229-.284a.5.5 0 00.15-.063l.067-.049a.5.5 0 00.099-.632l-.053-.073-6.07-6.916a.5.5 0 00-.138-.11l-.082-.035-.088-.02a.5.5 0 00-.507.256zm11.66 5.039a2.5 2.5 0 01-.975 3.399.5.5 0 01-.485-.875 1.5 1.5 0 00-1.454-2.624.5.5 0 01-.485-.875 2.5 2.5 0 013.399.975zm-5.03-6.206a.5.5 0 01.338.544l-.02.088-.677 2.035 2.068-.721a.5.5 0 01.6.225l.036.082a.5.5 0 01-.225.6l-.082.037L9.67 7.028a.5.5 0 01-.659-.55l.02-.08.995-3a.5.5 0 01.632-.316zM14.5 4a.5.5 0 110 1 .5.5 0 010-1zM7.862.403a2.5 2.5 0 01.735 3.459.5.5 0 01-.839-.545 1.5 1.5 0 10-2.516-1.634.5.5 0 01-.839-.545A2.5 2.5 0 017.862.403zM13.5 2a.5.5 0 110 1 .5.5 0 010-1zm-3-1a.5.5 0 110 1 .5.5 0 010-1zm4-1a.5.5 0 110 1 .5.5 0 010-1z" />
  </svg>
);

export const icon = EuiIconCheer;
