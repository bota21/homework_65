import "./Page.css";
import { Jumbotron, Container } from "reactstrap";
import { Button } from "reactstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import Spinner from '../../components/modalWindow/Spinner/Spinner';

const Page = (props) => {
  const [loading, setLoading] = useState(false);
  const [singleData, setSingleData] = useState();
  let idPost = props.match.params.id;

  useEffect(() => {
    setLoading(true);
    let fetchData = async () => {
      try {
        let response = await axios.get(idPost + ".json");
        response = Object.keys(response.data).map((id) => {
          setSingleData({ ...response.data, id });
        });
      } catch (e) {
        console.error(e);
      }
    };
    fetchData().finally(() => setLoading(false));
  }, [idPost]);

  let jumpEditPage = () => {
    return props.history.push("/posts/" + idPost + "/edit");
  };

  let deletePage = () => {
    setLoading(true);
    let fetchData = async () => {
      try {
        await axios.delete(idPost + ".json");
        return props.history.push("/");
      } catch (e) {
        console.error(e);
      }
    };
    fetchData().finally(() => setLoading(false));
  };

  return (
    <div className='Page'>
      {loading ? <Spinner /> : null}
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

export default Page;
