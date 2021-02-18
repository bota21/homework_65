import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Backdrop from '../Backdrop/Backdrop';


const ModalWindow = (props) => {

  return (
    <div>     
        <Backdrop show={props.show} clicked={props.close}/>
      <Modal isOpen={props.show}>
        <ModalHeader>ERROR</ModalHeader>
        <ModalBody>
         {props.children}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={props.close}>OK</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalWindow;