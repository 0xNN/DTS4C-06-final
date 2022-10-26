import { useState, useEffect } from "react";
import { useAuthValue } from '../auth/AuthContext'
import { signOut } from 'firebase/auth' 
import { auth } from '../auth/firebase'
import { Layout, Menu, Row, Col, Space, Skeleton, Badge, Spin, Image, Card, Typography } from "antd";
import axios from 'axios'
import { URL } from '../api/url'
import './Home.css';
import { 
  MailOutlined, 
  AppstoreOutlined, 
  SettingOutlined, 
  MenuOutlined,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  DotChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('News', '1', <PieChartOutlined />),
  getItem('Profile', 'sub1', <UserOutlined />, [
    getItem(
      <span onClick={() => signOut(auth)}>Sign Out</span>, '3'),
  ]),
];
const Home = () => {
  const {currentUser} = useAuthValue()
  const [collapsed, setCollapsed] = useState(false);
  const [topNews, setTopNews] = useState([]);
  const [newAll, setNewAll] = useState([]);
  const [detail, setDetail] = useState([]);
  const { Header, Content, Footer, Sider } = Layout;
  const { Title } = Typography;
  const { Meta } = Card;

  const getLatestNews = async () => {
    await axios.get(`${URL}news/all`, {
      params: {
        api_token: process.env.REACT_APP_TOKEN_NEWS,
        locale: 'id',
        language: 'id',
        limit: '16',
      }
    })
    .then((response) => {
      const data = response.data.data;
      setNewAll(data);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const getDetailNews = async (uuid) => {
    await axios.get(`${URL}news/uuid/${uuid}`, {
      params: {
        api_token: process.env.REACT_APP_TOKEN_NEWS,
        locale: 'id',
        language: 'id',
        limit: '16',
      }
    })
    .then((response) => {
      const data = response.data;
      setDetail(data);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const getTopNews = async () => {
    await axios.get(`${URL}news/top`, {
      params: {
        api_token: process.env.REACT_APP_TOKEN_NEWS,
        locale: 'id',
        language: 'id',
        limit: '1',
      }
    })
    .then(function (response) {
      const data = response.data.data[0];
      setTopNews(data);
    })
    .catch(function (error) {
      console.log(error);
    })
    // await axios.get(`${URL}nasional`)
    // .then(function (response) {
    //   const data = response.data.data[0];
    //   setTopNews(data);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // })
  }

  const contentStyle = {
    height: '200px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

  useEffect(() => {
    getTopNews();
    getLatestNews();
  }, []);
  return (
    <>
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
        <Layout className="site-layout">
          <Card>
            <div className="layout-content">
              <Title level={4}>Hot Topics</Title>
              <Row gutter={[24, 0]}>
                <Col
                  // key={index}
                  xs={24}
                  sm={24}
                  md={24}
                  lg={18}
                  xl={18}
                  className="mb-24"
                >
                  {topNews?.image_url ? (
                    <div className="container">
                      <Image
                        height={300}
                        width="100%"
                        src={topNews.image_url}
                      />
                      <div className="bottom-left">
                        <div className="card" style={{ marginLeft: 20, width: "20", padding: 10, }}>
                          <h4>{topNews.title}</h4>
                          <a style={{ fontWeight: 'bold' }} href={topNews.url} target="_blank" rel="noreferrer">Selengkapnya</a>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <center><Spin /></center>
                  )}
                </Col>
                <Col
                  // key={index}
                  xs={24}
                  sm={24}
                  md={24}
                  lg={6}
                  xl={6}
                  className="mb-24"
                >
                  <Card>
                    {
                      topNews?.description ? (
                        <>
                          <Title level={5}>Description</Title>
                          <p>
                            {topNews?.description} <a style={{ fontWeight: 'bold' }} href={topNews.url} target="_blank" rel="noreferrer">Selengkapnya</a>
                          </p>
                          <Badge count={new Date(topNews?.published_at).toLocaleString('id', {dateStyle: 'short'})} />
                        </>
                      ) : (
                        <center><Spin /></center>
                      )
                    }
                  </Card>
                  {/* <div class="container">
                    <Image src={topNews.image_url} height={300} alt="Snow" style={{ width: "100%" }} />
                    <div class="bottom-left">Bottom Left</div>
                    <div class="top-left">Top Left</div>
                    <div class="top-right">Top Right</div>
                    <div class="bottom-right">Bottom Right</div>
                    <div class="centered">Centered</div>
                  </div> */}
                </Col>
              </Row>
            </div>
          </Card>
          <br />
          <Card>
            <div className="layout-content">
              <Title level={4}>Latest News</Title>
              <Row gutter={[24, 0]}>
                {newAll?.map((item, index) => (
                  <Col
                    key={index}
                    xs={24}
                    sm={12}
                    md={12}
                    lg={6}
                    xl={6}
                    className="mb-24"
                    style={{
                      paddingTop: 8
                    }}
                  >
                    <Card
                      hoverable
                      cover={<img alt="example" src={item.image_url} />}
                    >
                      <Meta title={item.title} description={
                        <p>
                          {item.description} <a style={{ fontWeight: 'bold' }} onClick={e => getDetailNews(item.uuid)}>Selengkapnya</a>
                        </p>
                      } />
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </Card>
          <br />
          <Card>
            <div className="layout-content">
              <Title level={4}>Detail News</Title>
              <img src={detail?.image_url} alt="detail" />
              <h1>
                {detail.description}
              </h1>
            </div>
          </Card>
          <Content>
            {/* <div className='center'> */}
            {/* </div> */}
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            REACT4C - FINAL PROJECT - 2022 <br/>
            MUHAMMAD SENDI NOVIANSYAH - RIADI AMDAR YANDI
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default Home;
