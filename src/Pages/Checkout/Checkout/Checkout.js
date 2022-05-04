import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useServiceDetail from '../../../hooks/useServiceDetail';

const Checkout = () => {
    const {serviceId} = useParams();
    const [service] = useServiceDetail(serviceId);
    const [user, setUser] = useState({
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
    }
    return (
        <div className='w-50 mx-auto'>
            <h2>Please Order: {service.name}</h2>
            <form>
                <input className='w-100 mb-2 ps-1' type="text" name="name" id="" placeholder='Name' required/>
                <br />
                <input className='w-100 mb-2 ps-1' type="email" name="email" id="" placeholder='Email' required/>
                <br />
                <input className='w-100 mb-2 ps-1' type="text" value={service.name} name="service" id="" placeholder='Service' readOnly/>
                <br />
                <input className='w-100 mb-2 ps-1' type="text" name="address" onChange={handleAddressChange} id="" value={user.address} placeholder='Address' required/>
                <br />
                <input className='w-100 mb-2 ps-1' type="text" name="phone" id="" placeholder='Phone' required/>
                <br />
                <input className='btn btn-primary' type="submit" value="Order" />
            </form>
        </div>
    );
};

export default Checkout;