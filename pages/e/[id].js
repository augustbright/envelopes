import React from 'react';
import Layout from '../../components/layout';
import fetch from 'isomorphic-fetch';
import getConfig from 'next/config';

const Page = ({envelope}) => {
    return (
        <Layout>
            <div>
                <img src={envelope.image.url}/>
                <span>{envelope.text}</span>
            </div>
        </Layout>
    );
};

Page.getInitialProps = async (context) => {
    const {publicRuntimeConfig: {apiAddress}} = getConfig();
    const envelopeResponse = await fetch(`${apiAddress}/api/image/${context.query.id}`);
    const envelope = await envelopeResponse.json();
    return {envelope};
};

export default Page;