import React, { useState } from 'react';
import Layout from '../components/layout';
import UploadBox from '../components/upload-box';
import TempBox from '../components/temp-box';
import DoneBox from '../components/done-box';

const PHASE = {
    EMPTY: 'empty',
    TEMP: 'temp',
    DONE: 'done'
};

export default () => {
    const [phase, setPhase] = useState(PHASE.EMPTY);
    const [tempId, setTempId] = useState(null);
    const [imageId, setImageId] = useState(null);

    let content;

    const onTempUploaded = resultJSON => {
        setTempId(resultJSON[0]);
        setPhase(PHASE.TEMP);
    };

    const onImageCreated = imageJSON => {
        setImageId(imageJSON);
        setPhase(PHASE.DONE);
    };

    switch (phase) {
        case PHASE.TEMP:
            content = <TempBox {...{tempId, onImageCreated}}/>;
            break;

        case PHASE.DONE:
            content = <DoneBox {...{imageId}}/>;
            break;

        default:
        case PHASE.EMPTY:
            content = <UploadBox {...{onTempUploaded}}/>;
            break;
    }

    return (
        <Layout>
            {content}
        </Layout>
    );
};