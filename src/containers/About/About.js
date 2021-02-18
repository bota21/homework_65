import "./About.css";
import { Media } from "reactstrap";

const About = () => {
  return (
    <div className='About'>
      <Media>
        <Media left href='#'>
          <Media src='./logo192.png' alt='image' />
        </Media>
        <Media body>
          <Media heading>Media heading</Media>
          Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
          scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in
          vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi
          vulputate fringilla. Donec lacinia congue felis in faucibus.
        </Media>
      </Media>
    </div>
  );
};

export default About;
