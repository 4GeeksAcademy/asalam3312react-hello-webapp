import { Navigate, json } from "react-router";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: []
		},
		actions: {
			// Use getActions to call a function within a fuction

		},
		loadContactsData: async () => {
			try {
				const response = await fetch('https://playground.4geeks.com/contact/agendas/andres/contacts');
				if (!response.ok) {
					throw new Error(response.statusText)
				}
				const data = await response.json();
				setStore({ contacts: data.contacts })
			} catch (e) {
				console.error("An error happended fetching contacts data", e)
			}
		}
	}
}


export default getState;
