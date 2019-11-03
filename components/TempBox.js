import React, { createRef, useState } from 'react';
import { API_ROOT } from '../src/const';
import FlippingCard from './FlippingCard';

export default ({ tempId, onImageCreated, imageId }) => {
    const textRef = createRef();
    const [busy, setBusy] = useState(false);

    const onClickCreate = async e => {
        const text = textRef.current.innerText;
        setBusy(true);
        const imageResponse = await fetch(`${API_ROOT}/image`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tempId, text })
        });
        const imageJSON = await imageResponse.json();
        onImageCreated(imageJSON);
        setBusy(false);
    };

    return (
        <div>
            <FlippingCard front={(
                <img className="mw-100 mh-100" src={`${API_ROOT}/temp/${tempId}`} />
            )} back={(
                <div className={`${imageId ? '' : 'box-editable'} no-outline w-100`}
                    contentEditable={!imageId}
                    ref={textRef}
                    placeholder="Write your text here..." />
            )} />

            {busy ? (
                <div className="d-flex mt-5 justify-content-center">
                    <span>Loading...</span>
                </div>
            ) : ''}

            {imageId ? '' : (
                <div className={`${busy ? 'd-none' : 'd-flex'} mt-5 justify-content-center w-100`}>
                    <button className="btn btn-primary" onClick={onClickCreate}>Create</button>
                </div>
            )}
        </div>
    );
};