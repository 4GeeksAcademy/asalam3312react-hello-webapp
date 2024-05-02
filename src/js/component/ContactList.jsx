import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../store/appContext'
import {Link} from 'react-router-dom'
import { FaPencilAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import "../../styles/contactStyles.css";

export const ContactList = () => {
    const { store, actions } = useContext(Context);
    const [showModal, setShowModal] = useState(false);
    const [deleteContact, setDeleteContact] = useState(null);

    useEffect(()=>{
        actions.loadContactsData();
    },[])

    const handleClick = (contactId) => {
        console.log("ID del contacto a eliminar:", contactId); 
        setShowModal(true);
        setDeleteContact(contactId);
    }

   
    const deletingContact = async () => {
        console.log(deleteContact)
        try {
            
                const response = await fetch(`https://playground.4geeks.com/contact/agendas/andres/contacts/${deleteContact}`, {
                    method: 'DELETE', 
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    await actions.loadContactsData();
                    handleModalClose();
                } else {
                    throw new Error(response.statusText)
                }
            
        } catch (e) {
            console.error(e)
        }
        finally {
            handleModalClose();
        }
    }
    
    

    const handleModalClose = () => {
        setShowModal(false);
        setDeleteContact(null);
    };

    return (
        <div>
            <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex='-1' role='dialog' style={{ display: showModal ? 'block' : 'none' }}>
                <div className='modal.dialog' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h4 className='modal-title'>Delete contact</h4>
                            <button type='button' className='btn-close' onClick={handleModalClose}></button>
                        </div>
                        <div className='modal-body'>Are you sure?</div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary' onClick={handleModalClose}>Cancel</button>
                            <button type='button' className='btn btn-secondary' onClick={deletingContact}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container d-flex flex-column'>
                <div className='m-3 flex-end align-self-end'>
                    <Link to={'/AddNewContact'}>
                        <button type='button' className='btn btn-success'>Add new contact</button>
                    </Link>
                </div>
                <div>
                    <div>
                        <ul>
                            {store.contacts.map((item, index) => {
                                return (
                                    <div key={index} className='card container'>
                                        <li className='d-flex justify-content-between'>
                                            <div className='d-flex'>
                                                <div>
                                                    <img src='https://img.freepik.com/vector-premium/icono-perfil-avatar_188544-4755.jpg' alt='Contact'></img>
                                                </div>
                                                <div className='m-2'>
                                                    <p className='mx-2 fs-4 text text-dark'>{item.name}</p>
                                                    <p className='text-secondary'><FaPhone className='mx-2' />Phone:{item.phone}</p>
                                                    <p className='text-secondary'><MdOutlineEmail className='mx-2' />Email:{item.email}</p>
                                                    <p className='text-secondary'><FaMapMarkerAlt className='mx-2' />Address:{item.address}</p>
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-between'>
                                                <span className='px-2'>
                                                <Link to={`/updateContact/${item.id}`}><FaPencilAlt className='icons text-primary pt-2'/></Link>
                                                </span>
                                                <button className='delete' onClick={() => handleClick(item.id)}><MdDeleteForever className='icons-garbage text danger pt-2'/></button>
                                            </div>
                                        </li>
                                    </div>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
