import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
import { useState } from "react";
import Spinner from "../../components/modalWindow/Spinner/Spinner";

const AddForm = (props) => {
  const [postValue, setPostValue] = useState();
  const [loading, setLoading] = useState(false);

  let addValue = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setPostValue({ ...postValue, [name]: value });
  };

  let submitAddForm = (e) => {
    e.preventDefault();
    setLoading(true);
    let fetchData = async () => {
      try {
        if (postValue.title !== "" || postValue.text !== "") {
          let date = new Date();
          let newDate = date.toLocaleString("en-US", { hour12: false });
          let newValue = {
            date: newDate,
            title: postValue.title,
            text: postValue.text,
          };
          await axios.post(".json", newValue);
           props.history.push("/");
        } 
      } catch (e) {
        console.error(e);
      }
    };
    fetchData().finally(() => setLoading(false));
  };

  return (
    <Form onSubmit={(e) => submitAddForm(e)}>
      {loading ? <Spinner /> : null}
      <div className='form_wrapper'>
        <FormGroup>
          <h2>Add new post</h2>
        </FormGroup>
        <FormGroup>
          <Label for='input'>Title</Label>
          <Input
            type='text'
            id='input'
            name='title'
            onChange={addValue}
            placeholder='Enter a title'
          />
        </FormGroup>
        <FormGroup>
          <Label for='textarea'>Content</Label>
          <Input
            type='textarea'
            id='textarea'
            name='text'
            onChange={addValue}
            placeholder='Enter content'
          />
        </FormGroup>
        <Button color='success'>Save</Button>
      </div>
    </Form>
  );
};

export default AddForm;
