import React from 'react';
import ReactChart from 'echarts-for-react';

const Histogram = ({ title, renderList, styleData, br = false }) => {

    const option = {
        title: { text: title},
        tooltiop: { trigger: 'axis'},
        yAxis:[ {type: 'value', minInterval: 1}],
        xAxis:[
            {
                type:'category',
                data: renderList.xData,
                axisLable:{
                    interval:0,
                    formatter: ( value) => { br ? value.split(',').join('\n'): value }
                }
            }
        ],
        series:[
            {
                name:'人数',
                type:'bar',
                data: renderList.yData,
                label:{
                    show: true,
                    precision:1,
                    position:'top',
                    valueAnimation:true,
                }
            }
        ]
    }
    return (
        <div className='staff-amount-container' style={{ ...styleData }} >
            <ReactChart option={option} className="react_for_echarts" />
        </div>
    )
}

export default Histogram