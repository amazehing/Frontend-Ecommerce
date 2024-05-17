import React from 'react'
import "./Breadcrum.css"
import arrow_icon from "../Assets/breadcrum_arrow.png"

const Breadcrum = ({ item }) => {
    return (
        <div className='breadcrum'>
            HOME <img src={arrow_icon} alt=""/> Shop <img src={arrow_icon} alt=""/> {item.category.name} <img
            src={arrow_icon} alt=""/> {item.name}
        </div>
    )
}

export default Breadcrum
