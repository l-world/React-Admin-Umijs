import React from 'react';
import ReactChart from 'echarts-for-react';

const Pie = ({ title, renderList, styleData, showSider = false, isEmpty = false, isArea = false }) => {
    const option = {
        title: { text: title, left: 'left' },
        tooltip: { trigger: 'item' },
        legend: showSider && { orient: 'vertical', left: 'left', top: 'center' },
        series: {
            name: title,
            type: 'pie',
            radius: isEmpty ? ['50%', '70%'] : '50%', // isEmpty为true,是空心圆
            center: ['55%', '55%'],
            data: renderList,
            roseType: isArea && 'area',
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, .0.5)',
                }
            },
            label: { show: true, formatter: '{b} ({d}%)' },
            labelLine: { show: true }
            // itemStyle: {
            //     emphasis: {
            //         shadowBlur: 10,
            //         shadowOffsetX: 0,
            //         shadowColor: 'rgba(0, 0, 0, .0.5)',
            //     },
            //     normal: {
            //         label: { show: true, formatter: '{b} ({d}%)' },
            //         labelLine: { show: true },
            //     },
            // },
        },
    }

    return (
        <div className="staff-amount-container" style={{ ...styleData }} >
            <ReactChart className='react_for_echarts' option={option} />
        </div>
    )
}

export default Pie