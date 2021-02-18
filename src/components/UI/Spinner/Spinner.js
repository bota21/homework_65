import './Spinner.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const Spinner = (props) => {
    return <>
        <Backdrop show={true} />
    <div className="loader">loading</div>
    </>
}

export default Spinner
