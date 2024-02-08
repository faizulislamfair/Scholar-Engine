import React, { useState } from 'react';
import * as tf from '@tensorflow/tfjs';

const Form = () => {
    const [formData, setFormData] = useState({
        cgpa: '',
        ielts: '',
        gre: '',
        money: ''
    });

    const [matchingPercentages, setMatchingPercentages] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);


    const criteriaArrays = [
        [[2.75, 6.1, 311, 51001], [3.25, 6.2, 312, 57000], [3.5, 6.3, 313, 53000]],
        [[2.75, 6.4, 314, 52004], [3.25, 6.5, 315, 52000], [3.5, 6.6, 316, 58000]],
        [[2.75, 6.7, 317, 51007], [3.25, 6.8, 318, 57000], [3.5, 6.9, 319, 53000]],
        [[2.75, 7.0, 320, 50000], [3.25, 7.1, 321, 52000], [3.5, 7.2, 322, 58000]],
        [[2.75, 7.3, 323, 50000], [3.25, 7.4, 324, 57000], [3.5, 7.5, 325, 53000]],
        [[3, 7.6, 326, 56000], [3.25, 7.7, 327, 57000], [3.5, 7.8, 328, 58000]],
        [[3, 7.9, 329, 51000], [3.25, 8.0, 330, 52000], [3.5, 8.1, 331, 53000]],
        [[3, 8.2, 332, 56000], [3.25, 8.3, 333, 57000], [3.5, 8.4, 334, 58000]],
        [[3, 8.5, 335, 51000], [3.25, 8.6, 336, 52000], [3.5, 8.7, 337, 53000]],
        [[3, 8.8, 338, 56000], [3.25, 8.9, 339, 57000], [3.5, 9.0, 340, 58000]]
    ];


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleMainButtonClick = () => {
        setCurrentStep(1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        } else {
            calculateMatching();
        }
    };

    const calculateMatching = () => {
        const inputData = tf.tensor2d([
            [
                parseFloat(formData.cgpa),
                parseFloat(formData.ielts),
                parseFloat(formData.gre),
                parseFloat(formData.money)
            ]
        ]);

        const allPercentages = criteriaArrays.map(criteria => {
            const criteriaData = tf.tensor2d(criteria);
            const matches = inputData.greaterEqual(criteriaData).sum().arraySync();
            return (matches / (criteria.length * 4)) * 100;
        });

        setMatchingPercentages(allPercentages);
    };

    return (
        <div className="flex flex-col items-center justify-center p-10 m-10 -translate-y-[1750px]">

            {
                currentStep === 0 ?
                    <button
                        onClick={handleMainButtonClick}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-15 -translate-y-[80px]"
                    >
                        Explore Your Compatibility with Renowned Universities
                    </button>

                    :
                    <button
                        onClick={handleMainButtonClick}
                        className="hidden"
                    >
                        Explore Your Compatibility with Renowned Universities
                    </button>
            }


            {currentStep > 0 && (
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center p-4 mb-10 bg-white shadow-md rounded-lg -translate-y-12"
                >
                    {currentStep === 1 && (
                        <div className="mb-4 opacity-7 transition-opacity duration-500 ease-in-out transform translate-y-4">
                            <input
                                className="p-2 border-2 border-gray-200 rounded-md w-full"
                                type="number"
                                name="cgpa"
                                placeholder="CGPA"
                                value={formData.cgpa}
                                onChange={handleChange}
                            />
                        </div>
                    )}
                    {currentStep === 2 && (
                        <div className="mb-4 opacity-7 transition-opacity duration-500 ease-in-out transform translate-y-4">
                            <input
                                className="p-2 border-2 border-gray-200 rounded-md w-full"
                                type="number"
                                name="ielts"
                                placeholder="IELTS Score"
                                step="0.1"
                                value={formData.ielts}
                                onChange={handleChange}
                            />
                        </div>
                    )}
                    {currentStep === 3 && (
                        <div className="mb-4 opacity-7 transition-opacity duration-500 ease-in-out transform translate-y-4">
                            <input
                                className="p-2 border-2 border-gray-200 rounded-md w-full"
                                type="number"
                                name="gre"
                                placeholder="GRE Score"
                                value={formData.gre}
                                onChange={handleChange}
                            />
                        </div>
                    )}
                    {currentStep === 4 && (
                        <div className="mb-4 opacity-7 transition-opacity duration-500 ease-in-out transform translate-y-4">
                            <input
                                className="p-2 border-2 border-gray-200 rounded-md w-full"
                                type="number"
                                name="money"
                                placeholder="Amount of Money"
                                value={formData.money}
                                onChange={handleChange}
                            />
                        </div>
                    )}
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4"
                        type="submit"
                    >
                        {currentStep < 4 ? 'Next' : 'Submit'}
                    </button>
                </form>
            )}

            {matchingPercentages.length > 0 && (
                <div className="mt-4">
                    {matchingPercentages.map((percentage, index) => (
                        <p key={index}>
                            Admission Acceptance Percentage for University {index + 1}: {percentage.toFixed(2)}%
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Form;
