import React from 'react';
import './LoadingSpinner.css'

const LoadingSpinner = () => {
    return (
        <figure className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white z-50">
           <span class="loader"></span>
        </figure>
    );
};
const Loading = () => {
    return (
        <figure className="w-full h-full flex justify-center items-center bg-transparent z-50">
           <span class="loader"></span>
        </figure>
    );
};

export default LoadingSpinner;
export { Loading };
