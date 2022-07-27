import React from "react";
import style from "./Search.module.css";

function Search(props) {
  if (!props.errStatus) {
    return (
      <nav className={style.searchContainer}>
        <form className={style.searchForm}>
          <input
            type='text'
            className={style.searchBar}
            onChange={(e) => props.setQuery(e.target.value)}
            value={props.query}
            onKeyPress={props.search}
            placeholder='Поиск по городу или стране'></input>

          <button onClick={props.search} className={style.searchBtn}>
            <svg
              stroke='currentColor'
              fill='currentColor'
              strokeWidth='0'
              viewBox='0 0 1024 1024'
              height='1.5em'
              width='2.2em'
              xmlns='http://www.w3.org/2000/svg'>
              <path d='M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z'></path>
            </svg>
          </button>

          <button onClick={props.locationWeather} className={style.locationBtn}>
            <svg xmlns='http://www.w3.org/2000/svg' height='1.5em' width='2.2em' viewBox='0 0 24 24'>
              <path
                fill='#6C72F3'
                d='M21.15,2.86a2.89,2.89,0,0,0-3-.71L4,6.88a2.9,2.9,0,0,0-.12,5.47l5.24,2h0a.93.93,0,0,1,.53.52l2,5.25A2.87,2.87,0,0,0,14.36,22h.07a2.88,2.88,0,0,0,2.69-2L21.85,5.83A2.89,2.89,0,0,0,21.15,2.86ZM20,5.2,15.22,19.38a.88.88,0,0,1-.84.62.92.92,0,0,1-.87-.58l-2-5.25a2.91,2.91,0,0,0-1.67-1.68l-5.25-2A.9.9,0,0,1,4,9.62a.88.88,0,0,1,.62-.84L18.8,4.05A.91.91,0,0,1,20,5.2Z'
              />
            </svg>
          </button>
        </form>
      </nav>
    );
  }
}

export default Search;
