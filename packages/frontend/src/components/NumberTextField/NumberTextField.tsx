import React, { ChangeEvent } from 'react';
import MUITextField from '@mui/material/TextField';

interface Props {
  label: string;
  name: string;
  value: number;
  handleChange: (inputValues: number) => void;
}

const NumberTextField: React.FC<Props> = ({
  label,
  name,
  value,
  handleChange,
}) => {
  return (
    <input
      id='outlined-number'
      type='number'
      name={name}
      value={value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(Number(event.target.value));
      }}
    />
  );
};

export default NumberTextField;
