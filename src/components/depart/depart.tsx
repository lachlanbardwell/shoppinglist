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
  'fruit & Veg',
  'deli',
  'dairy',
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
      <div className="depart-headings">
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
          <h3 className="cart-heading">{`Category: ${convertDepart(
            props.currentCategory,
          )}`}</h3>
        </Paper>
      </div>
      <div className="depart-filters">
        {props.categories.map((next, i) => {
          return (
            <div className="depart-filters-headings" key={i}>
              <h3 onClick={() => props.filter(next)}>
                {convertDepart(next)}&nbsp;|&nbsp;
              </h3>
            </div>
          );
        })}
        <h3
          className="depart-filters-headings"
          onClick={() => props.filter('all')}
        >
          All
        </h3>
      </div>
    </div>
  );
};
