import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

interface Idepart {
  depart: string;
  setDepart: (depart: string) => void;
  convert: (depart: string) => string;
}

export const Department: React.FC<Idepart> = (props) => {
  const [option, setOption] = useState(props.depart);

  useEffect(() => {
    props.setDepart(option);
  }, [option]);

  const handleChange = (event: any) => {
    setOption(event.target.value);
  };

  const departArray: string[] = [
    'produce',
    'deli',
    'perishables',
    'meat',
    'grocery',
    'bathroom',
    'cleaning',
    'freezer',
  ];

  return (
    <div>
      <FormControl>
        <InputLabel>Department</InputLabel>
        <Select value={option} onChange={handleChange}>
          {departArray.map((next) => {
            return (
              <MenuItem value={next} key={next}>
                {props.convert(next)}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};
