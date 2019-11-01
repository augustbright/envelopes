import React, { createRef } from 'react';
import { API_ROOT } from '../src/const';

export default ({ tempId, onImageCreated }) => {
    const textRef = createRef();

    const onClickCreate = async e => {
        const text = textRef.current.value;
        const imageResponse = await fetch(`${API_ROOT}/image`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({tempId, text})
        });
        const imageJSON = await imageResponse.json();
        onImageCreated(imageJSON);
    };

    return (
        <div>
            <span>temp image uploaded</span>
            <img src={`${API_ROOT}/temp/${tempId}`} />
            <input type="text" ref={textRef} placeholder="Write your text here..."/>
            <button className="btn btn-primary" onClick={onClickCreate}>Create</button>
        </div>
    );
};