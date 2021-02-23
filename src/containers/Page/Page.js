import "./Page.css";
import { Jumbotron, Container } from "reactstrap";
import { Button } from "reactstrap";
import axiosBlog from "../../axiosBlog";
import { useState, useEffect } from "react";
import withErrorHandler from '../../HOC/withErrorHandler';

const Page = (props) => {
  const [singleData, setSingleData] = useState();
  let idPost = props.match.params.id;

  useEffect(() => {
    let fetchData = async () => {
      try {
        let response = await axiosBlog.get(idPost + ".json");
        response = Object.keys(response.data).map((id) => {
          setSingleData({ ...response.data, id });
        });
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [idPost]);

  let jumpEditPage = () => {
    return props.history.push("/posts/" + idPost + "/edit");
  };

  let deletePage = () => {
    let fetchData = async () => {
      try {
        await axiosBlog.delete(idPost + ".json");
        return props.history.push("/");
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  };

  return (
    <div className='Page'>
      {singleData ? (
        <Jumbotron fluid>
          <Container fluid>
            <h6>{singleData.date}</h6>
            <h1 className='display-3'>{singleData.title}</h1>
            <p className='lead'>{singleData.text}</p>
            <div className='buttons'>
              <Button color='warning' onClick={(id) => jumpEditPage(id)}>
                Edit
              </Button>
              <Button color='danger' onClick={deletePage}>
                Delete
              </Button>{" "}
            </div>
          </Container>
        </Jumbotron>
      ) : null}
    </div>
  );
};

export default withErrorHandler(Page, axiosBlog);
