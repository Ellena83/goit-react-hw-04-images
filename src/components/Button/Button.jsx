import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
    return (
        <div className={css.buttonContainer}
            onClick={onClick}
        >
            <button type='button' className={css.button}>
                Load more
            </button>
        </div>
    );
};
Button.propTypes = {
    onClick: PropTypes.func.isRequired,
}