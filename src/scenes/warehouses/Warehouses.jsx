import {
    Card,
    Title,
    Button,
    Metric,
    Text,
    List,
    ListItem,
    BadgeDelta,
    Flex,
    Bold,
    ColGrid,
} from '@tremor/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import baseURL from '../../api_requests/url';
import { useState } from 'react';
import { Spin } from 'antd';


export default function Warehouses() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [warehouses, setWarehouses] = useState([]);
    useEffect(() => {
        baseURL({
            credentials: 'include',
            method: "GET",
            url: "/api/v1/stock/byWarehouse",
        })
            .then((res) => {
                setWarehouses(res.data.data);
                console.log("from then: ", res.data.data)
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            })
    }, [])

    return (
        <div style={{ padding: 20, width: "100%" }}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Flex justifyContent="justify-start" spaceX="space-x-2">
                    <Title>Warehouse</Title>
                </Flex>
                <Button onClick={() => navigate('/add_warehouse')}>Add New</Button>
            </div>
            {isLoading ? <div className="loading">
                <Spin />
            </div> :
                (
                    <ColGrid numColsSm={2} numColsLg={3} gapX="gap-x-6" gapY="gap-y-6">
                        {/* {warehouses != null ?? console.log("wh: ", warehouses.length)} */}
                        {warehouses.map((item, index) => (
                            <Card key={item.warehouse}>
                                {console.log("item: ", item)}
                                <Text type="secondary">Warehouse . {item.warehouse_name}</Text>
                                <Metric>{item.metric}</Metric>
                                <Flex marginTop="mt-6">
                                    <Text><Bold>Products</Bold></Text>
                                    <Text><Bold>Amount</Bold></Text>
                                </Flex>
                                <List marginTop="mt-1">
                                    {item.warehouseProducts?.map((i) => (
                                        <ListItem key={i.product_name}>
                                            <Flex justifyContent="justify-start" spaceX="space-x-2.5" truncate={true}>
                                                <BadgeDelta deltaType={item.status} />
                                                <Text truncate={true}>{i.product_name}</Text>
                                            </Flex>
                                            <Text>{i.product_amount}</Text>
                                        </ListItem>
                                    ))}
                                </List>
                            </Card>
                        ))}
                    </ColGrid>)}
        </div>
    );
}