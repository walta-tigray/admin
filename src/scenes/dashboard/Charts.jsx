import {
    Card,
    Metric,
    Text,
    Divider,
    AreaChart,
    ColGrid,
} from '@tremor/react';
import { useState } from 'react';
import { useEffect } from 'react';
import baseURL from '../../api_requests/url';
import { Spin } from 'antd';

const month = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "Sep", "Oct", "Nov", "Dec"];

const valueFormatter = (number) => `$ ${Intl.NumberFormat('us').format(number).toString()}`;

export default function Charts() {
    const [grossVolume, setGrossVolume] = useState([0]);
    const [monthlySale, setMonthlySale] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        baseURL({
            url: '/api/v1/order/dashboard',
            method: 'GET',
        })
            .then(res => {
                const monthlyData = res.data.data.slice(0, res.data.data.length - 1);
                const grossVolume = res.data.data.slice(res.data.data.length - 1, res.data.data.length);
                let sale_storage = []

                monthlyData.map(data => {
                    sale_storage.push({
                        month: month[data.month - 1],
                        totalPrice: data.totalPrice
                    })
                })
                setMonthlySale(sale_storage)
                setGrossVolume(grossVolume)
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            })
    }, []);

    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'ETB',
    });

    return (
        <Card>
            <Text>Gross Volume</Text>
            {
                !isLoading ? <div>
                    <Metric>{currencyFormatter.format(grossVolume[0]?.annoualPrice)}</Metric>
                    <AreaChart
                        marginTop="mt-8"
                        data={monthlySale}
                        categories={['totalPrice']}
                        dataKey="month"
                        colors={['indigo']}
                        valueFormatter={valueFormatter}
                        showYAxis={false}
                        showLegend={false}
                        height="h-44"
                    />
                </div> : <div className="loading">
                    <Spin />
                </div>
            }

        </Card>
    );
}