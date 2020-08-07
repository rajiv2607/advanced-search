import React , { useState, useEffect } from 'react'
import ListView from './ListView'
import EmptyResult from './EmptyResult'
import useKeyPress from '../hooks/useKeyPress'


function AutoComplete(props) {

    let { textInput, searchResult } = props

    const [selected, setSelected] = useState(undefined);
    const downPress = useKeyPress("ArrowDown");
    const upPress = useKeyPress("ArrowUp");
    const [cursor, setCursor] = useState(0);
    const [hovered, setHovered] = useState(undefined);

    useEffect(() => {
      if (searchResult.length && downPress) {
        setCursor(prevState =>
          prevState < searchResult.length - 1 ? prevState + 1 : prevState
        );
      }
    }, [downPress]);
    useEffect(() => {
      if (searchResult.length && upPress) {
        setCursor(prevState => (prevState > 0 ? prevState - 1 : prevState));
      }
    }, [upPress]);

    useEffect(() => {
        if (searchResult.length && hovered) {
          setSelected(searchResult[cursor]);
        }
      }, [cursor]);

      useEffect(() => {
        if (searchResult.length && hovered) {
          setCursor(searchResult.indexOf(hovered));
        };
      }, [hovered]);

    return (
        <div className='automcomplete__container'>
            {
                (searchResult.length !== 0 || !textInput) ? searchResult.map((data,index) => {
                    if (searchResult.length === 0 && !textInput) {
                        return (
                            null
                        )

                    } else {
                        return (
                            <div>
                                <ListView setSelected={setSelected}
                                    setHovered={setHovered} key={data.id} name={data} highlight={textInput}
                                    active={index === cursor} item={data}/>
                            </div>
                        )
                    }
                }) : <EmptyResult />
            }
        </div>
    )
}

export default AutoComplete