import React from 'react'
import { Table } from 'antd';

function Tables({ data, columns }) {
    return (
        <div>
            <Table dataSource={data} columns={columns} />;
        </div>
    )
}

export default Tables