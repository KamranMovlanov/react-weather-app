import React from 'react'
import style from './Components.module.css'

function Search() {
    return (
        <div className={style.searchContainer}>
            <input type="text" className={style.searchBar} placeholder="Search city or country"></input>
        </div>
    )
}

export default Search