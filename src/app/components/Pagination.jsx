import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ pageCount, changePage }) => {
  return (
    <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      pageCount={pageCount}
      onPageChange={changePage}
      containerClassName={"pagination flex justify-center mt-4"}
      previousLinkClassName={"border rounded-l-md p-2 hover:bg-cyan-400"}
      nextLinkClassName={"border rounded-r-md p-2 hover:bg-cyan-400"}
      pageClassName={"m-1"}
      disabledClassName={"opacity-50 cursor-not-allowed"}
      activeClassName={"bg-cyan-500 text-white"}
    />
  );
};

export default Pagination;
