import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import { ModalContent } from 'components/Modal/Modal';

TrailerModal.propTypes = {
  item: PropTypes.object,
};

function TrailerModal({ item = {} }) {
  const iframeRef = useRef(null);

  const handleClose = () => {
    iframeRef.current.setAttribute('src', '');
  };
  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={handleClose}>
        <iframe
          ref={iframeRef}
          width="100%"
          height="500px"
          title="trailer"
        ></iframe>
      </ModalContent>
    </Modal>
  );
}

export default TrailerModal;
