import css from './Button.module.css';

export const Button = ({ onClick }) => {
    return (
        <div className={css.buttonContainer} onClick={onClick}>
            <button type='button' className={css.button}>
                Load more
            </button>
        </div>
    );
};