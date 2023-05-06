import {
    BadgeDelta,
    Card,
    DonutChart,
    Dropdown,
    DropdownItem,
    Flex,
    Legend,
    List,
    ListItem,
    Title,
} from '@tremor/react';
import { useEffect, useState } from 'react';

const regions = [
    { key: 'merkato', name: 'Merkato' },
    { key: 'jomo', name: 'Jomo' }
];


const cities = [
    {
        name: 'Corrugated Iron sheet',
        region: 'jomo',
        sales: 984888,
        delta: '6.1%',
        deltaType: 'increase',
    },
    {
        name: 'Gutter sheet',
        region: 'merkato',
        sales: 456700,
        delta: '1.2%',
        deltaType: 'moderateDecrease',
    },
    {
        name: 'EGa sheet',
        region: 'merkato',
        sales: 240000,
        delta: '2.3%',
        deltaType: 'moderateIncrease',
    },
    {
        name: 'Black wire',
        region: 'jomo',
        sales: 390800,
        delta: '0.5%',
        deltaType: 'moderateDecrease',
    },
    {
        name: 'Nails',
        region: 'jomo',
        sales: 190800,
        delta: '1.8%',
        deltaType: 'moderateIncrease',
    },
    {
        name: 'Rebar',
        region: 'merkato',
        sales: 164400,
        delta: '3.4%',
        deltaType: 'decrease',
    },
];

const valueFormatter = (number) => `${Intl.NumberFormat('us').format(number).toString()} $`;

const filterByRegion = (region, data) => (
    region === 'all'
        ? data
        : data.filter((city) => city.region === region)
);

export default function Circle() {
    const [selectedRegion, setSelectedRegion] = useState('all');
    const [filteredData, setFilteredData] = useState(cities);

    useEffect(() => {
        const data = cities;
        setFilteredData(filterByRegion(selectedRegion, data));
    }, [selectedRegion]);

    return (
        <Card maxWidth="max-w-sm">
            <Flex spaceX="space-x-8" justifyContent="justify-start" alignItems="items-center">
                <Title>Sales</Title>
                <Dropdown
                    handleSelect={ (value) => setSelectedRegion(value) }
                    placeholder="Region Selection"
                >
                    { regions.map((region) => (
                        <DropdownItem
                            key={ region.key }
                            value={ region.key }
                            text={ region.name }
                        />
                    )) }
                </Dropdown>
            </Flex>
            <Legend categories={ filteredData.map((city) => city.name) } marginTop="mt-6" />
            <DonutChart
                data={ filteredData }
                category="sales"
                dataKey="name"
                valueFormatter={ valueFormatter }
                marginTop="mt-6"
            />
            <List marginTop="mt-6">
                { filteredData.map((city) => (
                    <ListItem key={ city.name }>
                        { city.name }
                        <BadgeDelta
                            deltaType={ city.deltaType }
                            text={ city.delta }
                            size="xs"
                        />
                    </ListItem>
                )) }
            </List>
        </Card>
    );
}