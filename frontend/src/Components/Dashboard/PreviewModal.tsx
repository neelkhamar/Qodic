import moment from "moment";
import Modal from "../Common/Modal/Modal";

interface PreviewModalProps {
  isModalOpen: boolean;
  closeModal: any;
  selectedCharacter: any;
  capitalizeFirstLetter: any;
}

function PreviewModal({
  isModalOpen,
  closeModal,
  selectedCharacter,
  capitalizeFirstLetter,
}: PreviewModalProps) {
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      title={selectedCharacter?.name}
    >
      <hr />
      <div className="py-3">
        <h4 className="text-md font-semibold mb-3">Additional Information</h4>
        <div className="grid grid-cols-3 gap-4 pb-3">
          <p>
            <div>
              <strong className="text-sm">Height</strong>
            </div>
            {selectedCharacter?.height}
          </p>
          <p>
            <div>
              <strong className="text-sm">Mass</strong>
            </div>
            {selectedCharacter?.mass}
          </p>
          <p>
            <div>
              <strong className="text-sm">Created At</strong>
            </div>
            {moment(selectedCharacter?.created).format("DD-MM-YYYY")}
          </p>
          <p>
            <div>
              <strong className="text-sm">No. of Films</strong>
            </div>
            {selectedCharacter?.films?.length || 0}
          </p>
          <p>
            <div>
              <strong className="text-sm">Birth Year</strong>
            </div>
            {selectedCharacter?.birth_year}
          </p>
        </div>
        <hr />
        <h4 className="text-md font-semibold my-3">Home World</h4>
        <div className="grid grid-cols-3 gap-4">
          <p>
            <div>
              <strong className="text-sm">Name</strong>
            </div>
            {selectedCharacter?.homeworld?.name}
          </p>
          <p>
            <div>
              <strong className="text-sm">Terrain</strong>
            </div>
            {capitalizeFirstLetter(selectedCharacter?.homeworld?.terrain)}
          </p>
          <p>
            <div>
              <strong className="text-sm">Climate</strong>
            </div>
            {capitalizeFirstLetter(selectedCharacter?.homeworld?.climate)}
          </p>
          <p>
            <div>
              <strong className="text-sm">Population</strong>
            </div>
            {selectedCharacter?.homeworld?.population}
          </p>
        </div>
      </div>
      <hr />
      <button
        onClick={closeModal}
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mt-4"
      >
        Close Modal
      </button>
    </Modal>
  );
}

export default PreviewModal;
