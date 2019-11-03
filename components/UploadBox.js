import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { API_ROOT } from '../src/const';
import FlippingCard from './FlippingCard';

const ALLOWED_TYPES = new Set(['image/']);
const MAX_FILE_SIZE = 1 * 1024 * 1024 * 5;


export default ({ onTempUploaded }) => {
    const [busy, setBusy] = useState(false);

    const onChange = async e => {
        const formData = new FormData();
        const fileArray = Array.from(e.target.files);

        // validate files
        const validFiles = fileArray.every(file => {
            const validType = [...ALLOWED_TYPES].some(allowedType => file.type.startsWith(allowedType));
            const validSize = file.size <= MAX_FILE_SIZE;
            return validSize && validType;
        });

        if (!validFiles) {
            //TODO make beautiful alerts
            alert('Incorrect file');
            return;
        }

        fileArray.forEach((file, idx) => {
            formData.append(idx, file);
        });

        setBusy(true);

        const uploadResponse = await fetch(`${API_ROOT}/temp`, {
            method: 'POST',
            body: formData
        });

        const resultJSON = await uploadResponse.json();
        onTempUploaded(resultJSON);
        setBusy(false);
    };

    const uploadInterface = (
        <>
            <FontAwesomeIcon icon={faImage} size="2x" />
            <div className="mt-1">
                <h4>Click to upload</h4>
            </div>
        </>
    );

    return (
        <div className="actable">
            <label htmlFor="upload">
                <div class="upload-box">
                    {busy ? 'Uploading...' : uploadInterface}
                </div>
            </label>
            <input className="d-none" type="file" id="upload" onChange={onChange} />
        </div>
    );
};