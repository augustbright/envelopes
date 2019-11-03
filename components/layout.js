import React from 'react';
import '../style/style.scss';
import NavBar from './NavBar';
import Head from 'next/head';

export default ({ children }) => (
    <>
        <NavBar />
        <div className="container h-100">
            {children}
        </div>
    </>
);