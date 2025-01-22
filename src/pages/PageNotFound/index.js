import React from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, Layout, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Navbar } from "../components";

const { Content } = Layout;
const { Title } = Typography;

const PageNotFound = () => {
  return (
    <>
      <Navbar />
      <Layout style={{ minHeight: "100vh" }}>
        <Content style={{ padding: "24px", textAlign: "center" }}>
          <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
            <Col>
              <Title level={2} style={{ paddingBottom: "16px" }}>
                404: Page Not Found
              </Title>
              <Link to="/">
                <Button type="default" icon={<ArrowLeftOutlined />} size="large">
                  Go Back to Home
                </Button>
              </Link>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export default PageNotFound;
