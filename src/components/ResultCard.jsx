// ResultCard.js
import React from 'react';
import congratsImage from '../assets/images/congrats.png';
import sadImage from '../assets/images/newsad.png';

const ResultCard = ({ showCard, handleCloseCard, result }) => {

    const getImageSource = () => {
        return result === 'Yes' ? congratsImage : sadImage;
    };

    return (
        showCard && (
            <div className="my-4 mx-2 md:mx-0 bg-gray-100 p-4 rounded shadow-md">
                <img
                    src={getImageSource()}
                    alt={result === 'Yes' ? 'Congrats' : 'Sad'}
                    className="rounded-md mb-2 w-96 object-cover mx-auto"
                />
                <h1 className="text-lg font-bold mb-1 text-center">
                    {result === 'Yes' ? 'অভিনন্দন আপনাকে!' : 'দু:খিত আপনার জন্য!'}
                </h1>
                <p className="text-gray-700 mb-2 text-center">
                {result === 'Yes' ? 'আপনি আপনার ভোটটি দিতে পারেবেন, ভোট দিন নিজের পছন্দের পার্থীকে। ' 
                : 'আপনার ভোট এ বছরের জন্য দেয়া হয়ে গেছে, তাই কষ্ট করে ভোট দিতে যাওয়ার দরকার নাই!'}
                </p>
                <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300 block mx-auto"
                    onClick={handleCloseCard}
                >
                    Close
                </button>
            </div>
        )
    );
};

export default ResultCard;
