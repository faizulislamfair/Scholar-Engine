import React, { useState, useLayoutEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

const Form = () => {

    const handleReload = () => {
        window.scrollTo(0, 0);
        window.location.reload();
    };

    const [formData, setFormData] = useState({
        cgpa: '',
        ielts: '',
        gre: '',
        money: ''
    });

    const [matchingPercentages, setMatchingPercentages] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [formSubmitted, setFormSubmitted] = useState(false);

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
            setFormSubmitted(true);
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
            {currentStep === 0 ? (
                <button
                    onClick={handleMainButtonClick}
                    className="flex flex-row px-4 py-1  bg-[#D4E9F7] text-[20px] justify-between rounded text-black border border-[#3498DB] rounded-full mb-15 -translate-y-[80px] flex flex-row"
                >
                    <p className='translate-y-2'>
                        Explore Your Compatibility with Renowned Universities &nbsp;&nbsp;&nbsp;&nbsp;
                    </p>
                    <img src="/search.svg" className='w-[45px] translate-x-3' alt="" />
                </button>
            ) : (
                <button
                    onClick={handleMainButtonClick}
                    className="hidden"
                >
                    Explore Your Compatibility with Renowned Universities
                </button>
            )}

            {currentStep > 0 && !formSubmitted && (
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center p-4 mb-10 bg-white shadow-md rounded-lg -translate-y-[100px] text-center"
                >
                    <p className='text-[24px] font-bold'> Tell us a bit about yourself</p>
                    <p className='text-[#C27B0A] text-[18px]'>We need your data to process with our AI model. We only save your data with your clear permission.</p>
                    <div className='pt-8'>
                        {currentStep === 1 && (
                            <div className="mb-4 transition-opacity duration-500 ease-in-out transform translate-y-4">
                                <p className='text-[24px] font-[#600] font-bold pb-3'>What is your current CGPA?</p>
                                <input
                                    className="p-2 border-2 text-black border-gray-200 rounded rounded-lg w-full text-[18px]"
                                    name="cgpa"
                                    value={formData.cgpa}
                                    onChange={handleChange}
                                />
                            </div>
                        )}
                        {currentStep === 2 && (
                            <div className="mb-4 transition-opacity duration-500 ease-in-out transform translate-y-4">
                                <p className='text-[24px] font-[#600] font-bold pb-3'>What is your IELTS Score?</p>
                                <input
                                    className="p-2 border-2 text-black border-gray-200 rounded rounded-lg w-full text-[18px]"
                                    name="ielts"
                                    value={formData.ielts}
                                    onChange={handleChange}
                                />
                            </div>
                        )}
                        {currentStep === 3 && (
                            <div className="mb-4 transition-opacity duration-500 ease-in-out transform translate-y-4">
                                <p className='text-[24px] font-[#600] font-bold pb-3'>What is your GRE Score?</p>
                                <input
                                    className="p-2 border-2 text-black border-gray-200 rounded rounded-lg w-full text-[18px]"
                                    name="gre"
                                    value={formData.gre}
                                    onChange={handleChange}
                                />
                            </div>
                        )}
                        {currentStep === 4 && (
                            <div className="mb-4 transition-opacity duration-500 ease-in-out transform translate-y-4">
                                <p className='text-[24px] font-[#600] font-bold pb-3'>What is your estimated budget for study costs?</p>
                                <input
                                    className="p-2 border-2 text-black border-gray-200 rounded rounded-lg w-full text-[18px]"
                                    name="money"
                                    value={formData.money}
                                    onChange={handleChange}
                                />
                            </div>
                        )}
                    </div>
                    <button
                        className="px-4 py-2 bg-[#D4E9F7] rounded-full border border-[#3498DB]  text-black rounded mt-4"
                        type="submit"
                    >
                        {currentStep < 4 ? 'Next' : 'Submit'}
                    </button>
                </form>
            )}

            {formSubmitted && (
                <div className='-translate-y-[120px]'>

                    <p className='text-center'>According to our <span className='text-[#3498DB]'>AI model</span>, the result is:</p>

                    <div className="bg-[#fff] z-99 mt-4 pt-5 p-5 pr-12 border border-lg rounded-lg grid grid-cols-1 place-content-center content-center place-items-center shadow-md">

                        <p className='flex flex-row gap-12 font-bold text-center ml-[100px]'>
                            <p>University  </p>
                            <p>Acceptance Chance</p>
                        </p>
                        {matchingPercentages
                            .sort((a, b) => b - a)
                            .map((percentage, index) => (
                                <p className='flex flex-row gap-5 p-2' key={index}>
                                    <img className='w-[30px] -translate-y-1' src="/university.svg" alt="" />University {index + 1}
                                    <span className={`ml-12 ${percentage >= 80 ? 'text-green-500' :
                                        percentage >= 70 ? 'text-[#3498DB]' :
                                            percentage >= 50 ? 'text-[#C27B0A]' :
                                                'text-red-500'
                                        }`}>
                                        {percentage.toFixed(2)}%
                                    </span>
                                </p>
                            ))}

                    </div>

                    <div className='grid grid-cols-1 place-content-center content-center place-items-center'>
                        <button className='text-center text-[#3498DB] text-[16px] font-[700] pt-5' onClick={handleReload} ><u>Search again</u></button>
                    </div>

                </div>
            )}
        </div>
    );
};

export default Form;
