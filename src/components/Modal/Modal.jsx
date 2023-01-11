import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import css from "./Modal.module.css";

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ children, onClose }) => {

    useEffect(() => {
        window.addEventListener('keydown', onCloseHandler)

        return () =>
            window.removeEventListener('keydown', onCloseHandler)
    });

    const onCloseHandler = evt => {
        if (evt.code === 'Escape') {
            onClose();
        }
    }
    const handleBackdropClick = evt => {
        if (evt.currentTarget === evt.target) {
            onClose();
        }
    };
    return createPortal(
        <div className={css.modalBackdrop} onClick={handleBackdropClick}>
            <div className={css.modalContent}>{children}</div>
        </div>,
        modalRoot,
    )

}
Modal.defaultProps = {
    children: null,
};

Modal.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};