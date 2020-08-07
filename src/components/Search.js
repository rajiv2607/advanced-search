import React, { useState, useEffect, useRef } from 'react'
import JsonData from '../resources/JsonData'
import AutoComplete from './AutoComplete'

function Search() {

    const [keyWord, setKeyWord] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [json, setJson] = useState([])
    const textInput = useRef('')

    useEffect(() => {
        setJson(JsonData)
        textInput.current.focus();
    }, [])

    useEffect(() => {
        let returnDataName
        let returnDatapincode
        let returnDataAddress

        let result = []
        json.map((user) => {
            returnDataName = [user.name].filter((fil) => {
                return fil.indexOf(textInput.current.value) !== -1
            })

            returnDatapincode = [user.pincode].filter((fil) => {
                return fil.indexOf(textInput.current.value) !== -1
            })

            returnDataAddress = [user.address].filter((fil) => {
                return fil.indexOf(textInput.current.value) !== -1
            })

            if (returnDataName.length !== 0 || returnDataAddress.length !== 0 || returnDatapincode.length !== 0) {
                result.push(...searchResult, user)
            }
        })

        if (textInput.current.value) {
            setSearchResult(result)

        }
    }, [keyWord])

    function handleChange() {
        setSearchResult([])
        setKeyWord(textInput.current.value)
    }

    function escFunction(event){
        if(event.keyCode === 27) {
            setSearchResult([])
            textInput.current.value=''
        }
      }

    return (
        <div>

            <div className='search-container'>
                <input className='search__input' placeholder='search here' ref={textInput} onChange={handleChange} onKeyDown={escFunction}></input>
                <button className='search__button'>Search</button>
            </div>
            <div>
                <AutoComplete textInput={textInput.current.value} searchResult={searchResult}  />
            </div>
        </div>
    )
}


export default Search;