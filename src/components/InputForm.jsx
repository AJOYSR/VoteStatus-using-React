// InputForm.js
import React from 'react';

const InputForm = ({ inputValue, handleInputChange, handleSubmit }) => {
    return (
        <form className="my-4 mx-2 md:mx-0" onSubmit={handleSubmit}>
            <label className="block mb-2 text-lg text-black">
                Enter Your Name / আপনার নাম লিখুন :
                <input
                    type="text"
                    placeholder="Type here / এখানে লিখুন"
                    className="block w-full p-2 border border-gray-300 rounded"
                    value={inputValue}
                    onChange={handleInputChange}
                />
            </label>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
                Submit
            </button>
        </form>
    );
};

export default InputForm;
