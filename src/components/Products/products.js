import {
    Badge,
    Button,
    Card,
    Image,
    List,
    Rate,
    Typography,
} from "antd";
import { useEffect, useState } from "react";
import { getAllProducts, getProductsByCategory } from "../../API";
import { useParams } from "react-router-dom";
import { addCart } from "../../store/action";
import { useDispatch } from "react-redux";
import { HeartFilled } from "@ant-design/icons";

function Products() {
    const [loading, setLoading] = useState(false);
    const param = useParams();
    const [items, setItems] = useState([]);
    const [sortOrder, setSortOrder] = useState("az");
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        (param?.categoryId
            ? getProductsByCategory(param.categoryId)
            : getAllProducts()
        ).then((res) => {
            setItems(res.products);
            setLoading(false);
        });
    }, [param]);

    const AddToCartButton = ({ item }) => {

        return (
            <Button
                type="link"
                onClick={() => {
                    dispatch(addCart(item))
                }}
                loading={loading}
            >
                Add to Cart
            </Button>
        );
    }

    const AddToWishList = () => {
        return (
            <Button
                type="link"
                onClick={() => {
                }}
                loading={loading}
            >
                Add to WishList
            </Button>
        );
    }

    const getSortedItems = () => {
        const sortedItems = [...items];
        sortedItems.sort((a, b) => {
            const aLowerCaseTitle = a.title.toLowerCase();
            const bLowerCaseTitle = b.title.toLowerCase();

            if (sortOrder === "az") {
                return aLowerCaseTitle > bLowerCaseTitle
                    ? 1
                    : aLowerCaseTitle === bLowerCaseTitle
                        ? 0
                        : -1;
            } else if (sortOrder === "za") {
                return aLowerCaseTitle < bLowerCaseTitle
                    ? 1
                    : aLowerCaseTitle === bLowerCaseTitle
                        ? 0
                        : -1;
            } else if (sortOrder === "lowHigh") {
                return a.price > b.price ? 1 : a.price === b.price ? 0 : -1;
            } else if (sortOrder === "highLow") {
                return a.price < b.price ? 1 : a.price === b.price ? 0 : -1;
            }
        });
        return sortedItems;
    };

    return (
        <div className="productsContainer">
            <List
                loading={loading}
                grid={{ column: 3 }}
                renderItem={(product, index) => {
                    return (

                        <Card
                            className="itemCard"
                            title={product.title}
                            key={index}
                            cover={
                                <Image className="itemCardImage" src={product.thumbnail} />
                            }
                            actions={[
                                <Rate allowHalf disabled value={product.rating} />,
                                <HeartFilled onClick={()=>{}} />,
                                <AddToCartButton item={product} />,
                            ]}
                        >
                            <Card.Meta
                                title={
                                    <Typography.Paragraph>
                                        Price: ${product.price}{" "}
                                        {/* <Typography.Text delete type="danger">
                                                $
                                                {parseFloat(
                                                    product.price +
                                                    (product.price * product.discountPercentage) / 100
                                                ).toFixed(2)}
                                            </Typography.Text> */}
                                    </Typography.Paragraph>
                                }
                                description={
                                    <Typography.Paragraph
                                        ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
                                    >
                                        {product.description}
                                    </Typography.Paragraph>
                                }
                            >
                            </Card.Meta>
                        </Card>
                    );
                }}
                dataSource={getSortedItems()}
            ></List>
        </div>
    );
}


export default Products;