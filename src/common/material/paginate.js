import { useEffect, useState } from "react"



//custom hook must start with the keyword 'use'
const usePaginateBluePrint = (data, searchTerm)=>{
    
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);
    
    useEffect(()=>{
      setCurrentPage(1);
    }, [searchTerm])

    const lastIndexOfCurrentPage = currentPage * postPerPage;
    const firstIndexOfCurrentPage = lastIndexOfCurrentPage - postPerPage;
    const currentPost = data.slice(firstIndexOfCurrentPage, lastIndexOfCurrentPage);

    const changePage = (pageNumber)=>{
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0)
    }

    

    const totalPage = Math.ceil(data.length/postPerPage);

    return {currentPost, totalPage, currentPage, changePage};

  
}  
export default usePaginateBluePrint;