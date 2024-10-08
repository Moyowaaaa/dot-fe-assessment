import React, { SetStateAction } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  limit: number;
  setLimit: React.Dispatch<SetStateAction<number>>;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  limit,
  setLimit,
  onPageChange,
}: PaginationProps) => {
  return (
    <div
      className="w-10/12  mx-auto 
                  items-center justify-between flex
"
    >
      <div className="flex gap-4 items-center">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span>{`Page ${currentPage}`}</span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <select
        className="w-[10rem] rounded-md p-2"
        onChange={(e) => setLimit(parseInt(e.target.value))}
      >
        <option value={10}>10 per page</option>
        <option value={5}>5 per page</option>
        <option value={2}>2 per page</option>
      </select>
    </div>
  );
};

export default Pagination;
