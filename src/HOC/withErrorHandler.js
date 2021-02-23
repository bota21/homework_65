import { useEffect, useState, useMemo } from "react";
import ModalWindow from "../components/UI/ModalWindow/ModalWindow";
import Spinner from "../components/UI/Spinner/Spinner";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    axios.interceptors.request.use((request) => {
      setLoading(true);
      return request;
    });

    const interceptor = useMemo(() => {
      return axios.interceptors.response.use(
        (response) => {
          setLoading(false);
          return response;
        },
        (error) => {
          setError(error);
          setLoading(false);
        }
      );
    }, []);

    useEffect(() => {
      return () => {
        axios.interceptors.response.eject(interceptor);
      };
    });

    const errorDismiss = () => {
      setError(null);
    };

    return (
      <>
        {loading ? <Spinner /> : null}
        <ModalWindow show={!!error} close={errorDismiss}>
          {error && error.message}
        </ModalWindow>
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withErrorHandler;
