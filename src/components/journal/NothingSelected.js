import React from 'react'

export const NothingSelected = () => {
  return (
    <div className="containerLogo animate__animated animate__fadeIn animete__faster">

        <div className="loader">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
        </div>
        <p> 
            Select something
            <br />
            or create an entry        
        </p>
    </div>
  )
}
