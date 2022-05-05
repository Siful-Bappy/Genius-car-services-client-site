import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useServiceDetail from '../../../hooks/useServiceDetail';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';

const Checkout = () => {
    const {serviceId} = useParams();
    const [service] = useServiceDetail(serviceId);
    const [user] = useAuthState(auth);

    const handlePlaceOrder = event => {
        const order = {
            email: user.email,
            service: service.name,
            serviceId: serviceId,
            address: event.target.address.value,
            phone: event.target.phone.value
        }
        event.preventDefault();
    }

    /* if(user) {
        console.log(user);
    } */

    /* const [user, setUser] = useState({
        name: "Akber the Great",
        email: "akber@gmail.com",
        address: "Tajmohol road",
        phone: '01021784525'
    });

    const handleAddressChange = event => {
        console.log(event.target.value);
        const {address, ...rest} = user;
        const newAddress = event.target.value;
        const newUser = {address: newAddress, ...rest};
        setUser(newUser);
        console.log(address, rest);
    } */
    return (
        <div className='w-50 mx-auto'>
            <h2>Please Order: {service.name}</h2>
            <form onSubmit={handlePlaceOrder}>
                <input className='w-100 mb-2 ps-1' type="text" value={user.displayName} name="name" id="" placeholder='Name' readOnly required disabled/>
                <br />
                <input className='w-100 mb-2 ps-1' type="email" name="email" value={user.email} id="" placeholder='Email' readOnly required/>
                <br />
                <input className='w-100 mb-2 ps-1' type="text" value={service.name} name="service" id="" placeholder='Service' readOnly autoComplete='off'/>
                <br />
                <input className='w-100 mb-2 ps-1' type="text" name="address" /* onChange={handleAddressChange} id="" value={user.address} */ placeholder='Address' required/>
                <br />
                <input className='w-100 mb-2 ps-1' type="text" name="phone" id="" placeholder='Phone' required/>
                <br />
                <input className='btn btn-primary' type="submit" value="Order" />
            </form>
        </div>
    );
};

export default Checkout;