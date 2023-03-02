import React from 'react';
import ReactChart from 'echarts-for-chart';

const Histogram = ({ title, renderList, styleData }) => {
    
    const option = {

    }
    return (
        <div className='staff-amount-container' style={{ ...styleData }} >
            <ReactChart option={option} className="react_for_echarts" />
        </div>
    )
}

export default Histogram