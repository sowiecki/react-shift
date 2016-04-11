import React, { PropTypes } from 'react';

const Pagination = (props) => {
  const { classes, styles, fakeLinks, page, pageCount, onClick } = props;

  const paginationArray = Array
    .apply(null, { length: pageCount + 1 })
    .map(Number.call, Number);

  const renderPage = (n) => {
    return n === page ? (
      <a
        key={`currentPage-${page}`}
        className={`${classes.pageNumber}-${n} ${classes.currentPage}`}
        // TODO Implement unique style prop for each page number element
        style={styles.currentPage}
        href={fakeLinks ? '#' : null}>
        {n + 1}
      </a>
    ) : (
      <a
        key={`page-${n}`}
        className={classes.pageNumber}
        style={styles.pageNumber}
        href={fakeLinks ? '#' : null}
        onClick={onClick.bind(null, n)}>
        {n + 1}
      </a>
    );
  };

  return (
    <span
      key='react-shift-pagination'
      className={classes.pagination}
      style={styles.pagination}>
      {paginationArray.map(renderPage)}
    </span>
  );
};

export default Pagination;

Pagination.propTypes = {
  classes: PropTypes.object,
  styles: PropTypes.object,
  fakeLinks: PropTypes.bool,
  page: PropTypes.number,
  pageCount: PropTypes.number,
  onClick: PropTypes.func
};
