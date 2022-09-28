import React, { useEffect, useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from '@material-ui/core';
import { IDepart } from '../../types';
import { convertDepart } from '../../transformers/convert-depart';
import './depart.css';

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
    <div className="depart-form">
      <FormControl>
        <InputLabel>Department</InputLabel>
        <Select value={option} onChange={handleChange}>
          {departArray.map((next) => {
            return (
              <MenuItem value={next} key={next}>
                {convertDepart(next)}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Paper className="depart-paper">
        <h3 className="cartHeading">
          {convertDepart(props.depart)}
          Department
        </h3>
      </Paper>
    </div>
  );
};
