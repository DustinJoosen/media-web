import { Modal } from 'react-bootstrap';
import {API_URL} from "../../services/apiService.js";

const MediaItemPreviewPopup = ({ show, togglePopup, mediaId }) => {
	const imageSrc = API_URL + "/media/" + mediaId + "/preview";
	return (
		<Modal show={show} onHide={togglePopup}>
			<Modal.Header closeButton>
				<Modal.Title>Preview</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<img src={imageSrc} alt="Image preview." className="img-fluid"
					 style={{ maxHeight: '400px', objectFit: 'contain' }} />
			</Modal.Body>
		</Modal>
	);
};

export default MediaItemPreviewPopup;
