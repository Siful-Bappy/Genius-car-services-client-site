import React from 'react';
import sleeping from "../../../images/sleeping2.JPG";

const NotFound = () => {
    return (
        <div>
            <h2 className='text-center text-danger my-3'>Mechanic is sleeping</h2>
            <div className='d-flex justify-content-center'>
                <img className='h-25' src={sleeping} alt="" />
            </div>
        </div>
    );
};

export default NotFound;