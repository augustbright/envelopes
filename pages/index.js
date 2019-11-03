import React, { useState } from 'react';
import Layout from '../components/layout';
import UploadBox from '../components/UploadBox';
import TempBox from '../components/TempBox';
import DoneBox from '../components/done-box';

export default () => {
    const [tempId, setTempId] = useState(null);
    const [imageId, setImageId] = useState(null);

    let content;

    const onTempUploaded = resultJSON => {
        setTempId(resultJSON[0]);
    };

    const onImageCreated = imageJSON => {
        setImageId(imageJSON);
    };

    return (
        <Layout>
            <div className="row justify-content-center">
                <div className="col col-auto">
                    {tempId ? <TempBox {...{ tempId, onImageCreated, imageId }} /> : <UploadBox {...{ onTempUploaded }} />}
                    {imageId ? <DoneBox {...{ imageId }} /> : ''}
                </div>
            </div>
        </Layout>
    );
};