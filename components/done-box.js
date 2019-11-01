import React from 'react';

export default ({ imageId }) => {
    const envelopeURL = `${window.location.protocol}//${window.location.host}/e/${imageId}`;
    return (
        <div>
            <h2>Here is the link to your envelope</h2>
            <div>
                <span>{envelopeURL}</span>
                <a target="_blank" href={envelopeURL}>link</a>
            </div>
        </div>
    );
};