import React from 'react'
import './Loader.css'

const Loader = () => (
  <div className="loader-container">
    <div className="loader" id="loader-1">
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </div>
    <div className="loader" id="loader-2">
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </div>
    <div className="loader" id="loader-3">
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </div>
  </div>
)

export default Loader
