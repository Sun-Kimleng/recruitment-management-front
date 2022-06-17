import { Fragment, useState } from "react"



//custom hook must start with the keyword 'use'
const usePaginateBluePrint = (data)=>{

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(7);
    
    const lastIndexOfCurrentPage = currentPage * postPerPage;
    const firstIndexOfCurrentPage = lastIndexOfCurrentPage - postPerPage;
    const currentPost = data.slice(firstIndexOfCurrentPage, lastIndexOfCurrentPage);

    const changePage = (pageNumber)=>{
        setCurrentPage(pageNumber);
    }

    const totalPage = Math.ceil(data.length/postPerPage);

    return {currentPost, totalPage, currentPage,changePage};

  
}  
export default usePaginateBluePrint;