import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { IDepart } from '../types';

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

export const Department: React.FC<IDepart> = (props) => {
  const [option, setOption] = useState<string>(props.depart);

  useEffect(() => {
    props.setDepart(option);
  }, [option]);

  const handleChange: React.ChangeEventHandler<{ value: unknown }> = (
    event,
  ) => {
    setOption(event.target.value as string);
  };

  return (
    <div className="departForm">
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
