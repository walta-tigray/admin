import React from 'react';
import { Pie } from '@ant-design/plots';

function PieChart() {

    const data = [
        {
            type: 'Test 1',
            value: 27,
        },
        {
            type: 'Test 2',
            value: 25,
        },
        {
            type: 'Test 3',
            value: 18,
        },
        {
            type: 'Test 4',
            value: 150,
        },
    ];
    const config = {
        appendPadding: 5,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.75,
        label: {
            type: 'spider',
            labelHeight: 28,
            content: '{name}\n{percentage}',
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
    };

    return (
        <div>
            <Pie {...config} />
        </div>
    )
}

export default PieChart