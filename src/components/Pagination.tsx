import React from 'react';
interface PaginationProps{
    issuesPerPage:number,
    totalIssues:number,
    paginate:(arg0: number)=>void
}

const Pagination:React.FC<PaginationProps> = props => {
    const{totalIssues,issuesPerPage,paginate}=props;
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalIssues / issuesPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
        <ul className='pagination'>
          {pageNumbers.map(number => (
            <li key={number} className='page-item'>
              <a onClick={() => paginate(number)} href='!#' className='page-link'>
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  };
  
  export default Pagination;