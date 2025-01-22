import { ArrowLeftOutlined, HomeFilled, ShoppingCartOutlined } from "@ant-design/icons";
import {
    Badge,
    Button,
    Card,
    Checkbox,
    Col,
    Divider,
    Drawer,
    Form,
    Input,
    InputNumber,
    List,
    Menu,
    message,
    Row,
    Table,
    Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToCart, getCart } from "../../API";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { addCart, delCart } from "../../store/action";

const { Title, Text } = Typography;


function AppHeader() {
    const navigate = useNavigate();

    const onMenuClick = (item) => {
        navigate(`/${item.key}`);
    };
    return (
        <div className="appHeader">
            <Menu
                className="appMenu"
                onClick={onMenuClick}
                mode="horizontal"
                items={[
                    {
                        label: <HomeFilled />,
                        key: "",
                    },
                    {
                        label: "Men",
                        key: "men",
                        children: [
                            {
                                label: "Men's Shirts",
                                key: "mens-shirts",
                            },
                            {
                                label: "Men's Shoes",
                                key: "mens-shoes",
                            },
                            {
                                label: "Men's Watches",
                                key: "mens-watches",
                            },
                        ],
                    },
                    {
                        label: "Women",
                        key: "women",
                        children: [
                            {
                                label: "Women's Dresses",
                                key: "womens-dresses",
                            },
                            {
                                label: "Women's Shoes",
                                key: "womens-shoes",
                            },
                            {
                                label: "Women's Watches",
                                key: "womens-watches",
                            },
                            {
                                label: "Women's Bags",
                                key: "womens-bags",
                            },
                            {
                                label: "Women's Jewellery",
                                key: "womens-jewellery",
                            },
                        ],
                    },
                    {
                        label: "Fragrances",
                        key: "fragrances",
                    },
                ]}
            />
            <Typography.Title>React E-Commerce</Typography.Title>
            <Cart />
        </div>
    );
}
const Cart = () => {
    const state = useSelector((state) => state?.handleCart);
    const dispatch = useDispatch();
    const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

    const EmptyCart = () => (
        <Row justify="center" align="middle" style={{ minHeight: "50vh" }}>
            <Col>
                <Card style={{ textAlign: "center" }}>
                    <Title level={3}>Your Cart is Empty</Title>
                    <Button type="primary" icon={<ArrowLeftOutlined />} size="large">
                        <Link to="/">Continue Shopping</Link>
                    </Button>
                </Card>
            </Col>
        </Row>
    );

    const addItem = (product) => dispatch(addCart(product));
    const removeItem = (product) => dispatch(delCart(product));

    const ShowCart = () => {
        let subtotal = 0;
        let shipping = 30.0;
        let totalItems = 0;

        state.forEach((item) => {
            subtotal += item.price * item.qty;
            totalItems += item.qty;
        });

        return (
            <>
                <Row gutter={16} justify="center">
                    <Col xs={24} md={16}>
                        <Card title="Item List">
                            <List
                                itemLayout="vertical"
                                dataSource={state}
                                renderItem={(item) => (
                                    <List.Item>
                                        {console.log('item', item)}
                                        <List.Item.Meta
                                            avatar={
                                                <img
                                                    src={item.images}
                                                    alt={item.title}
                                                    width={100}
                                                    height={75}
                                                    style={{ borderRadius: 4 }}
                                                />
                                            }
                                            title={<Text strong>{item.title}</Text>}
                                        />
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <Button
                                                icon={<MinusOutlined />}
                                                onClick={() => removeItem(item)}
                                            />
                                            <Text style={{ margin: "0 16px" }}>{item.qty}</Text>
                                            <Button
                                                icon={<PlusOutlined />}
                                                onClick={() => addItem(item)}
                                            />
                                            <Text style={{ marginLeft: 16 }}>
                                                <strong>{item.qty}</strong> x ${item.price}
                                            </Text>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={16} justify="center">

                <Col  >
                    <Card title="Order Summary">
                        <List bordered>
                            <List.Item>
                                Products ({totalItems}) <Text>${Math.round(subtotal)}</Text>
                            </List.Item>
                            <List.Item>
                                Shipping <Text>${shipping}</Text>
                            </List.Item>
                            <Divider />
                            <List.Item>
                                <Text strong>Total amount</Text>
                                <Text strong>${Math.round(subtotal + shipping)}</Text>
                            </List.Item>
                        </List>
                        <Button type="primary" block>
                            <Link to="/checkout">Go to checkout</Link>
                        </Button>
                    </Card>
                </Col>
                </Row>
            </>
        );
    };

    return (
        <>
            <div>
                <Badge
                    onClick={() => {
                        setCartDrawerOpen(true);
                    }}
                    count={state.length}
                    className="soppingCartIcon"
                >
                    <ShoppingCartOutlined />
                </Badge>
                <Drawer
                    open={cartDrawerOpen}
                    onClose={() => {
                        setCartDrawerOpen(false);
                    }}
                    title="Your Cart"
                    contentWrapperStyle={{ width: 500 }}
                >
                    <Divider />
                    {state.length > 0 ? <ShowCart /> : <EmptyCart />}
                </Drawer>
            </div>
        </>
    );
};

export default AppHeader;