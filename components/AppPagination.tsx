import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';

interface AppPAginationInterface {
  postsPerPage: number;
  totalPosts: number;
  currentPage: number;
  paginate: (value: number) => void;
  onNavclick: (value: string) => void;
}
const AppPagination: React.FC<AppPAginationInterface> = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
  onNavclick,
}) => {
  let pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    // setPageNumbers([...pageNumbers, i]);
    pageNumbers.push(i);
  }
  //   styles
  const classes = useStyles();
  return (
    <nav>
      <ul className={classes.root}>
        <li
          style={{
            display: currentPage === pageNumbers[0] ? 'none' : 'inline-block',
          }}
        >
          <button
            className={`${classes.paginationBtn} ${classes.boldText}`}
            onClick={() => onNavclick('prev')}
          >
            {'<'}
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button
              className={`${classes.paginationBtn} ${
                currentPage === number && classes.boldText
              }`}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          </li>
        ))}
        <li
          style={{
            display:
              currentPage === pageNumbers[pageNumbers.length - 1]
                ? 'none'
                : 'inline-block',
          }}
        >
          <button
            className={`${classes.paginationBtn} ${classes.boldText}`}
            onClick={() => onNavclick('next')}
          >
            {'>'}
          </button>
        </li>
      </ul>
    </nav>
  );
};
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      listStyle: 'none',
      display: 'flex',
      justifyContent: 'center',
    },
    paginationBtn: {
      padding: '5px 10px',
      border: '0px',
      cursor: 'pointer',
      fontSize: '20px',
      color: '#B4B4B4',
      background: 'transparent',
      '&:hover': {
        color: '#fff !important',
        background: '#000000',
      },
    },
    boldText: {
      color: '#000000 !important',
      fontWeight: 'bold',
    },
  })
);
export default AppPagination;
