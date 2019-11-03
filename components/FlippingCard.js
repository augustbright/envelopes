import React from 'react';
import PropTypes from 'prop-types';

const FlippingCard = ({ front, back, turn }) => {
    return (
        <div className="flipping-perspective">
            <div className={`flipping-container ${turn ? 'flipping-turn' : ''}`}>
                <div className="upload-box flipping-front flipping-side">
                    {front}
                </div>
                <div className="upload-box flipping-back flipping-side">
                    {back}
                </div>
            </div>

        </div>
    );
}

FlippingCard.propTypes = {
    front: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ]).isRequired,

    back: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ]).isRequired,

    turn: PropTypes.bool
};

export default FlippingCard;