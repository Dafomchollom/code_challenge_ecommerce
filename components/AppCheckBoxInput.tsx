import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
interface AppCheckBoxInterface {
  //   id: string;
  handleCheckChieldElement: (data: any) => void;
  isChecked?: boolean;
  name: string;
}
const CheckBox: React.FC<AppCheckBoxInterface> = (props) => {
  // deconstruct props
  const { handleCheckChieldElement, isChecked, name } = props;
  // styles
  const classes = useStyles();
  return (
    <li className={classes.listWrapper}>
      <input
        onClick={handleCheckChieldElement}
        type="checkbox"
        checked={isChecked}
        value={name}
        className={classes.checkBox}
      />
      <span className={classes.label}>{name}</span>
    </li>
  );
};
const useStyles = makeStyles((theme) =>
  createStyles({
    listWrapper: {
      margin: '0px 0px 15px',
    },
    label: {
      padding: '0rem 1rem',
      fontSize: '22px',
      lineHeight: '24px',
      color: '#1D1D1D',
      wordSpacing: '5px',
    },
    checkBox: {
      width: '15px',
      height: '15px',
      cursor: 'pointer',
      borderRadius: '0px',
      border: '2px solid #000000',
    },
  })
);
export default CheckBox;
