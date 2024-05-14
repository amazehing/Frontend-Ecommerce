import React from 'react'
import "./NewsLetter.css"

const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>Get Exclusive Offers on your Email</h1>
        <p>Subscribe to our newsletter and stay updated</p>
        <div>
            <input type="email" className="Your Email id" />
            <button className="Subscribe">Subscribe</button>
        </div>
    </div>
  )
}

export default NewsLetter
