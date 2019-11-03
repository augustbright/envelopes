import React, { useState } from 'react';
import getConfig from 'next/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faAngleRight } from '@fortawesome/free-solid-svg-icons';

export default ({ imageId }) => {
    const { publicRuntimeConfig: { clientAddress } } = getConfig();
    const envelopeURL = `${clientAddress}/e/${imageId}`;
    const [textCopied, setTextCopied] = useState(false);

    const copyToClipboard = str => {
        const el = document.createElement('textarea');
        el.value = str;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        setTextCopied(true);
        setTimeout(() => {setTextCopied(false)}, 5000);
    };

    return (
        <div className="input-group mt-5">
            <div className="input-group-prepend">
                <span className="input-group-text">URL</span>
            </div>
            <input type="text" className="url-input form-control" placeholder="url" value={envelopeURL} />

            <button className={`btn ${textCopied ? 'btn-success' : 'btn-light'} ml-1`} onClick={() => copyToClipboard(envelopeURL)}>
                <FontAwesomeIcon icon={faCopy} size="1x" />
                <span className="ml-1">{textCopied ? 'Copied' : 'Copy'}</span>
            </button>

            <a className="btn btn-light ml-1" href={envelopeURL} target="_blank">
                <span className="mr-1">Open</span>
                <FontAwesomeIcon icon={faAngleRight} size="1x" />
            </a>
        </div>
    );
};