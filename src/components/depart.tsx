import React, { useEffect, useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core';

interface Idepart {
  depart: string;
  setDepart: (depart: string) => void;
}

export const Department: React.FC<Idepart> = (props) => {
  const [option, setOption] = useState(props.depart);

  useEffect(() => {
    props.setDepart(option);
  }, [option]);

  const handleChange = (event: any) => {
    setOption(event.target.value);
    console.log(option);
  };

  return (
    <div>
      <FormControl>
        <InputLabel>Department</InputLabel>
        <Select value={option} onChange={handleChange}>
          <MenuItem value={'produce'}>Produce</MenuItem>
          <MenuItem value={'deli'}>Deli</MenuItem>
          <MenuItem value={'perishables'}>Perishables</MenuItem>
          <MenuItem value={'meat'}>Meat</MenuItem>
          <MenuItem value={'grocery'}>Grocery</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
