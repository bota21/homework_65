import "./EditForm.css";
import axiosBlog from "../../axiosBlog";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useState, useEffect } from "react";
import Spinner from '../../components/UI/Spinner/Spinner';

const EditForm = (props) => {
  const [singleData, setSingleData] = useState();
  const [loading, setLoading] = useState(false);
  let idPost = props.match.params.id;

  let changeValue = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setSingleData({ ...singleData, [name]: value });
  };
  useEffect(() => {
    setLoading(true);
    let cleanupFunction = false;
    let fetchData = async () => {
      try {
        let response = await axiosBlog.get(idPost + ".json");
        response = Object.keys(response.data).map((id) => {
          if(!cleanupFunction) {
          setSingleData({ ...response.data, id });
        }
        });
      } catch (e) {
        console.error(e);
      }
    };
    fetchData().finally(() => setLoading(false));
    return () => cleanupFunction = true;
  }, [idPost]);

  let submitEditForm = (e) => {
    setLoading(true);
    e.preventDefault();    
    let fetchData = async() => {
      try {        
        let newValue = {
          date: singleData.date,
          title: singleData.title,
          text: singleData.text,
        };
        await axiosBlog.put(idPost + ".json", newValue);
        return props.history.push("/posts/" + idPost);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData().finally(() => setLoading(false));
  };
  return (
    <Form onSubmit={(e) => submitEditForm(e)}>
      {loading ? <Spinner /> : null}
      {singleData ? (
        <div className='form_wrapper'>
          <FormGroup>
            <h2>Edit post</h2>
          </FormGroup>
          <FormGroup>
            <Label for='title'>Title</Label>
            <Input
              type='text'
              id='title'
              name='title'
              value={singleData.title}
              onChange={changeValue}
            />
          </FormGroup>
          <FormGroup>
            <Label for='text'>Content</Label>
            <Input
              className='textarea'
              type='textarea'
              id='text'
              name='text'
              value={singleData.text}
              onChange={changeValue}
            />
          </FormGroup>
          <Button color='success'>Save</Button>
        </div>
      ) : null}
    </Form>
  );
};

export default EditForm;
