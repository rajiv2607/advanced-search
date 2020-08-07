import React from 'react'


class EmptyResult extends React.Component {
    render() {
        console.log("No result ")
        return (
            <div className='empty-search-container'>
                <div className='no__search'>No Result Found</div>
            </div>
        )
    }
}

export default EmptyResult