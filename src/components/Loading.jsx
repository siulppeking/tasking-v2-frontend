import React from 'react'

import svg from '../assets/taskingv2_logo.png';

import './loading.css';

const Loading = () => {
  return (
    <div className="modal-preload">
            <div className="circles">
                <div className="circle"></div>
                <div className="mainLogo">
                    <img src={svg} alt="" style={{opacity: 0.4, width: '68%', marginTop: '23px', marginLeft: '6px'}} />
                </div>
            </div>
        </div>
  )
}

export default Loading