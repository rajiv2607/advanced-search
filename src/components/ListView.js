import React from 'react'

class ListView extends React.Component {
    constructor(props) {
        super(props)
        this.highlightSearchText = this.highlightSearchText.bind(this)
    }

    highlightSearchText(text, highlight) {
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return <span> {parts.map((part, index) =>
            <span key={index} style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold' } : {}}>
                {part}
            </span>)
        } </span>;
    }

    render() {

        let { name, address, pincode } = this.props.name
        let {highlight, setHovered,active, item } = this.props

        return (
            <div className={`container ${active ? "active" : ""}`} 
                onMouseLeave={() => setHovered(undefined)} onMouseEnter={() => setHovered(item)}>
                <label className='input__name'> {this.highlightSearchText(name, highlight)}</label>
                <label className='input__name'> {this.highlightSearchText(address, highlight)}</label>
                <label className='input__name'> {this.highlightSearchText(pincode, highlight)}</label>

            </div>
        )
    }
}

export default ListView