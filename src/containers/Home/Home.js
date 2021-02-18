import "./Home.css";
import axios from "axios";
import { Card, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";
import { useState, useEffect } from 'react';
import Spinner from '../../components/modalWindow/Spinner/Spinner';

const Home = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let fetchData = async () => {
      try {
        let response = await axios.get(`.json`);
        response = Object.keys(response.data).map((id) => {
          return { ...response.data[id], id };
        });
        setData(response);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData().finally(() => setLoading(false));
  }, []);
  
  let jumpSinglePage = (id) => {
    return props.history.push("/posts/" + id);
  };
 
  let renderBlogs = data.map((item) => {
    return (
      <Card key={item.id}>
        {loading ? <Spinner /> : null}
        <CardBody>
          <CardSubtitle tag='h6' className='mb-2 text-muted'>
            {item.date}
          </CardSubtitle>
          <CardTitle tag='h5'>{item.title}</CardTitle>
          <Button color='success' onClick={() => jumpSinglePage(item.id)}>
            Read more &gt;&gt;
          </Button>
        </CardBody>
      </Card>
    );
  });
  return <div className='blog_wrapper'>{renderBlogs}</div>;
};

export default Home;
