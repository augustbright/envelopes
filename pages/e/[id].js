import React, { useState } from 'react';
import Layout from '../../components/layout';
import fetch from 'isomorphic-fetch';
import getConfig from 'next/config';
import FlippingCard from '../../components/FlippingCard';

const Page = ({ envelope }) => {
    const [turn, setTurn] = useState(false);
    return (
        <Layout>
            <div className="row mt-5 h-100 justify-content-center align-items-center">
                <div className="col col-auto">
                    <FlippingCard {...{ turn }}
                        front={(<img className="mw-100 mh-100" src={envelope.image.url} />)}
                        back={(<span>{envelope.text}</span>)}
                    />
                </div>
            </div>
        </Layout>
    );
};

Page.getInitialProps = async (context) => {
    const { publicRuntimeConfig: { apiAddress } } = getConfig();
    const envelopeResponse = await fetch(`${apiAddress}/api/image/${context.query.id}`);
    const envelope = await envelopeResponse.json();
    return { envelope };
};

export default Page;