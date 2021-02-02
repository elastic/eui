import React, { useState } from 'react';

import { EuiComboBox, EuiFieldText } from '../../../../src/components';

export default () => {
  const [name, setName] = useState('');

  const onSubmit = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    window.alert('form submitted');
  };

  const options = [
    { label: 'Chandler', color: 'hotpink' },
    { label: 'Rachel', color: 'green' },
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);

  return (
    <form onSubmit={onSubmit}>
      <EuiFieldText value={name} onChange={(ev) => setName(ev.target.value)} />
      <EuiComboBox
        options={options}
        onChange={(options) => setSelectedOptions(options)}
        selectedOptions={selectedOptions}
      />
      {/* <input type="submit" /> */}
    </form>
  );
};
