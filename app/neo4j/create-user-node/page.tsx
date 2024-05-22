'use client'
import { useState } from 'react';
import axios, { AxiosError } from 'axios';

const CreateUserForm: React.FC = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        isStudent: false,
        title: '',
        terms: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post('/api/v1/query/neo4j/createUserNode', formData);
            console.log('User created successfully!');
        } catch (error) {
            console.error('Error creating user:', error);
            console.log('Error creating user');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-4">Create User</h2>
            <div className="mb-4">
                <label htmlFor="firstname" className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
                <label htmlFor="lastname" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
                <label htmlFor="isStudent" className="block text-gray-700 text-sm font-bold mb-2">Is Student</label>
                <input type="checkbox" id="isStudent" name="isStudent" checked={formData.isStudent} onChange={handleChange} className="mr-2 leading-tight" />
            </div>
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
                <label htmlFor="terms" className="block text-gray-700 text-sm font-bold mb-2">Agree to terms</label>
                <input type="checkbox" id="terms" name="terms" checked={formData.terms} onChange={handleChange} className="mr-2 leading-tight" />
            </div>
            <div className="flex items-center justify-between">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create User</button>
            </div>
        </form>
    );
};

export default CreateUserForm;
