import "./Home.css";
import axiosBlog from "../../axiosBlog";
import { Card, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";
import { useState, useEffect } from "react";
import withErrorHandler from "../../HOC/withErrorHandler";

const Home = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let fetchData = async () => {
      try {
        let response = await axiosBlog.get(`.json`);
        response = Object.keys(response.data).map((id) => {
          return { ...response.data[id], id };
        });
        setData(response);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  let jumpSinglePage = (id) => {
    return props.history.push("/posts/" + id);
  };

  let renderBlogs = data.map((item) => {
    return (
      <Card key={item.id}>
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
  return (
    <div className='blog_wrapper'>
      {renderBlogs}
    </div>
  );
};

export default withErrorHandler(Home, axiosBlog);
