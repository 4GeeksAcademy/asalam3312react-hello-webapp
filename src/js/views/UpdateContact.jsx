import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import { json } from 'react-router-dom';

export const UpdateContact = () => {
    const { actions, store } = React.useContext(Context);
    const { contactId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(() => {
        const contactToUpdate = store.contacts.find(contact => contact.id == contactId);
        if (contactToUpdate) {
            return {
                name: contactToUpdate.name,
                address: contactToUpdate.address,
                phone: contactToUpdate.phone,
                email: contactToUpdate.email
            };
        } else {
            return {
                name: '',
                address: '',
                phone: '',
                email: ''
            }
        }
    });

    const change = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/andres/contacts/${contactId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            await actions.loadContactsData();
            navigate('/')
        } catch (e) {
            console.error('An error happened', e)
        }
    };
    return (
        <div className='container card mt-4 w-50'>
            <h1 className='pt-2 px-2'>Update Contact</h1>
            <form className='px-2' onSubmit={submit}>
                <div className='mb-3'>
                    <label className='form-label' htmlFor='FullName'>Full name</label>
                    <input type='text' className='form-control' id='FullName' value={formData.name} onChange={change} aria-describedby='' name='name'></input>
                </div>
                <div className='mb-3'>
                    <label className='form-label' htmlFor='Email'>Email</label>
                    <input type='email' className='form-label' id='Email' value={formData.email} onChange={change} area-describedby='emailHelp' name='email'></input>
                </div>
                <div className='mb-3'>
                    <label className='form-label' htmlFor='Phone'>Phone</label>
                    <input type='number' className='form-control' id='Phone' value={formData.phone} onChange={change} area-describedby=''></input>
                </div>
                <div className='mb-3'>
                    <label className='form-label' htmlFor='Address'>Address</label>
                    <input type='text' className='form-control' id='Address' value={formData.address} onChange={change} area-describedby=''></input>
                </div>
                <button type='submit' className='btn btn-primary'>Update contact</button>
            </form>
            <Link to={'/'} className='mt-2 pb-2 px-2'>Go back to contact list</Link>
        </div>
    )
}

