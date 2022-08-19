import React from 'react'

const Pagination = ({size,setCurrentPage,itemPerPage}) => {
    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id)) 
      }
    const pages = [];
    for (let i = 1; i <= Math.ceil(size/ itemPerPage); i++) {
        pages.push(i);
      }
      const rendPageNumbers = pages.map((number, index) => {
        return (
          <li key={index} id={number} className="page-item page-link" onClick={(e)=>setCurrentPage(e.target.id)}>{number}</li>
        )
      });
  return (
    <ul className='mt-2 pagination'>
    {rendPageNumbers}
  </ul>
  )
}

export default Pagination