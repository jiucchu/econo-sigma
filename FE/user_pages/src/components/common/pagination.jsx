import React from 'react';

import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import axios, { AxiosResponse } from 'axios';
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";


const StyledPagination = styled.div`
    button {
        border: none;
        background-color: white;
        font-size: 0.9em;
        font-weight: 600;
        color : #4D4ABF;


    &.active {
      color: #FB8500;
    }

    &:disabled {
      cursor: default;
      opacity: 0.5;}
        
    }
    
    ul {
        list-style : none;
    }

    li{
        width : 2em;
    }



`

const Paging = ({ response }) => {
  console.log(response)
  const pageListSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState('');
  const [keyword, setKeyword] = useState('');

  const totalPages = response.data.pageInfo.totalPages;
  const currentListIndex = Math.floor((currentPage) / pageListSize);


  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const page = searchParams.get('page');
    const categoryParam = searchParams.get('category');
    const keywordParam = searchParams.get('keyword');
    if (page) {
      setCurrentPage(Number(page));
    }
    if (categoryParam) {
      setCategory(categoryParam);
    }
    if (keywordParam) {
      setKeyword(keywordParam);
    }
  }, [searchParams]);


  const updateSearchParams = (pageNumber) => {
    const params = {};
    if (category) params.category = category;
    if (keyword) params.keyword = keyword;
    params.page = pageNumber;
    setSearchParams(params);
  };



  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    updateSearchParams(pageNumber);

  };

  const handleNextList = () => {
    const nextListFirstPage = currentPage + 1;
    if (nextListFirstPage <= totalPages) {
      setCurrentPage(nextListFirstPage);
      updateSearchParams(nextListFirstPage);
    }
  };

  const handlePrevList = () => {
    const prevListFirstPage = Math.max(1, currentPage - 1);
    console.log(currentListIndex)
    setCurrentPage(prevListFirstPage);
    updateSearchParams(prevListFirstPage);


  };

  const goToFirstPage = () => {
    setCurrentPage(1);
    updateSearchParams(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
    updateSearchParams(totalPages);
  };

  const renderPageNumbers = () => {
    const startPage = currentListIndex * pageListSize + 1;
    const endPage = Math.min(startPage + pageListSize - 1, totalPages);

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNumber) => (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={currentPage === pageNumber ? 'active' : ''}
      >
        {pageNumber}
      </button>
    ));
  };

  return (
    <div>
      <StyledPagination>
        <button onClick={goToFirstPage}>&lt;&lt;</button>
        <button onClick={handlePrevList}>&lt;</button>
        {renderPageNumbers()}
        <button onClick={handleNextList}>&gt;</button>
        <button onClick={goToLastPage}>&gt;&gt;</button>
      </StyledPagination>
    </div>
  );
};

export default Paging