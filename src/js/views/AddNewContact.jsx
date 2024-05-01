import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Context } from '../store/appContext'


export const AddNewContact = () => {
    const {actions} = React.useContext(Context)
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        email: ''
    });

    const navigate = useNavigate();

    const change = (e)=>{
        const {name, value} = e.target;
        setFormData(prev => ({...prev,[name]:value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch('https://playground.4geeks.com/contact/agendas/andres/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error(response.statusText)
            };
            await actions.loadContactsData();
            navigate('/');
        } catch (e) {
            console.error('Error posting contact', e)
        }
    }
    
    return (
        <div className='container card mt-4 w-50'>
            <h1 className='pt-2 px-2'>Add new contact</h1>
            <form className='px-2 mb-3' onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='FullName' className='form-label'>Full name</label>
                    <input type='text' area-describedly='' value={formData.name} onChange={change}  className='form-control'id='FullName' name='name'></input>
                </div>
                <div className='mb-3'>
                    <label htmlFor='Email' className='form-label'>Email</label>
                    <input type='email' area-describedly='emailHelp' value={formData.email} onChange={change}  className='form-control'id='Email' name='email'></input>
                </div>
                <div className='mb-3'>
                    <label htmlFor='Phone' className='form-label'>Phone number</label>
                    <input type='number' area-describedly='' value={formData.phone} onChange={change}  className='form-control'id='Phone' name='phone'></input>
                </div>
                <div className='mb-3'>
                    <label htmlFor='Address' className='form-label'>Address</label>
                    <input type='text' area-describedly='' value={formData.address} onChange={change}  className='form-control'id='Address' name='address'></input>
                </div>
                <button type='submit' className='btn btn-primary' onSubmit={handleSubmit}> Create contact</button>
            </form>
            <Link to={'/'} className='mt-2 pb-2 px-2'> Go back contact list</Link>
        </div>
    )
}
