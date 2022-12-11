export const Button = ({ onLoadMore }) => {
    return (
        <div className="buttonContainer" onClick={onLoadMore}>
            <button type="button" className="button">
                Load more
            </button>
        </div>
    );
};