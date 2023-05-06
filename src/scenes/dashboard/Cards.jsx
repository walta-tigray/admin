import {
    Card,
    Metric,
    Text,
    Flex,
    BadgeDelta,
    // DeltaType,
    // Color,
    ColGrid,
} from '@tremor/react';
import axios from 'axios';
import baseURL from '../../api_requests/url';
import { useEffect, useState } from 'react';

const colors = {
    increase: 'emerald',
    moderateIncrease: 'emerald',
    unchanged: 'orange',
    moderateDecrease: 'rose',
    decrease: 'rose',
};

const categories = [
    {
        title: 'North Region',
        metric: '12,699',
        metricPrev: '9,456 Birr',
        delta: '34.3%',
        deltaType: 'moderateIncrease',
    },
    {
        title: 'South Region',
        metric: '867',
        metricPrev: '940',
        delta: '10.9%',
        deltaType: 'moderateDecrease',
    },
    {
        title: 'East Region',
        metric: '1,072',
        metricPrev: '856',
        delta: '25.3%',
        deltaType: 'moderateIncrease',
    },
];

function Cards() {
    const [data, setData] = useState([]);


    // useEffect(() => {
    //     setData([])
    //     axios.all([
    //         baseURL({
    //             method: "GET",
    //             url: "/api/v1/order/totalSales",
    //         }),

    //         baseURL({
    //             method: "GET",
    //             url: "/api/v1/stock/total",
    //         }),
    //         baseURL({
    //             method: "GET",
    //             url: "/api/v1/employee/total",
    //         })
    //     ]).then(axios.spread((Sales, Stock, Employee) => {

    //         setData((data) =>
    //             [...data,
    //             {
    //                 title: "Sales",
    //                 amount: Sales.data.data
    //             }])
    //         setData((data) =>
    //             [...data,
    //             {
    //                 title: "Stock",
    //                 amount: Stock.data.data
    //             }])
    //         setData((data) =>
    //             [...data,
    //             {
    //                 title: "Employee",
    //                 amount: Employee.data.data
    //             }])
    //     }))
    // }, [])
    return (
        <ColGrid numColsSm={2} numColsLg={3} gapX="gap-x-6" gapY="gap-y-6">
            {/* {data?.map((item) => (
                <Card key={item.title}>
                    <Text>{item.title}</Text>
                    <Flex
                        justifyContent="justify-start"
                        alignItems="items-baseline"
                        spaceX="space-x-3"
                        truncate={true}
                    >
                        <Metric>{item.amount}</Metric>
                    </Flex>
                </Card>
            ))} */}
            {
                categories.map((item) => (
                    <Card key={item.title}>
                        <Text>{item.title}</Text>
                        <Flex
                            justifyContent="justify-start"
                            alignItems="items-baseline"
                            spaceX="space-x-3"
                            truncate={true}
                        >
                            <Metric>{item.delta}</Metric>
                        </Flex>
                    </Card>
                ))
            }
        </ColGrid>
    );
}

export default Cards