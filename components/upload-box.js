import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { API_ROOT } from '../src/const';

const ALLOWED_TYPES = new Set(['image/']);
const MAX_FILE_SIZE = 1 * 1024 * 1024 * 5;


export default ({onTempUploaded}) => {
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

        const uploadResponse = await fetch(`${API_ROOT}/temp`, {
            method: 'POST',
            body: formData
        });

        const resultJSON = await uploadResponse.json();
        onTempUploaded(resultJSON);
    };

    return (
        <div>
            <label htmlFor="upload">
                <FontAwesomeIcon className="hoverable" icon={faImage} size="5x" />
            </label>
            <input className="d-none" type="file" id="upload" onChange={onChange} />
        </div>
    );
};