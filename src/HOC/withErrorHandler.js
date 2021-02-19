import { useEffect, useState, useMemo } from "react";
import ModalWindow from "../components/UI/ModalWindow/ModalWindow";

const withErrorHandler = (WrappedComponent, axios) => {
	return (props) => {
		const [error, setError] = useState(null);

		const interceptor = useMemo(() => {
			return axios.interceptors.response.use(
				(response) => response,
				(error) => {
					setError(error);
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
				<ModalWindow show={!!error} close={errorDismiss}>
					{error && error.message}
				</ModalWindow>
				<WrappedComponent {...props} />
			</>
		);
	};
};

export default withErrorHandler;
