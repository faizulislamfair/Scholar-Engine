import React, { useState } from 'react';
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
        [[2.75, 6.1, 260, 31001], [3.25, 6.2, 265, 37000], [3.5, 6.3, 270, 33000]],
        [[2.75, 6.4, 260, 32004], [3.25, 6.5, 265, 32000], [3.5, 6.6, 270, 38000]],
        [[2.75, 6.7, 260, 31007], [3.25, 6.8, 265, 37000], [3.5, 6.9, 270, 33000]],
        [[2.75, 7.0, 260, 30000], [3.25, 7.1, 265, 32000], [3.5, 7.2, 270, 38000]],
        [[2.75, 7.3, 260, 30000], [3.25, 7.4, 265, 37000], [3.5, 7.5, 270, 33000]],
        [[3, 7.6, 260, 36000], [3.25, 7.7, 265, 37000], [3.5, 7.8, 270, 38000]],
        [[3, 7.9, 260, 31000], [3.25, 8.0, 265, 32000], [3.5, 8.1, 270, 33000]],
        [[3, 8.2, 260, 36000], [3.25, 8.3, 265, 37000], [3.5, 8.4, 270, 38000]],
        [[3, 8.5, 260, 31000], [3.25, 8.6, 265, 32000], [3.5, 8.7, 270, 33000]],
        [[3, 8.8, 260, 36000], [3.25, 8.9, 265, 37000], [3.5, 9.0, 270, 38000]]
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleMainButtonClick = () => {
        setCurrentStep(1);
    };

    const handleBackButtonClick = () => {
        setCurrentStep(currentStep - 1);
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
        <div className="flex flex-col items-center justify-center p-10 m-10">
            {currentStep === 0 ? (
                <button
                    onClick={handleMainButtonClick}
                    className="flex flex-row px-4 py-1  bg-[#D4E9F7] text-[20px] justify-between rounded text-black border border-[#3498DB] rounded-full mb-15 -translate-y-[80px] flex flex-row h-[55px]"
                >
                    <p className='translate-y-2'>
                        Click the search button to get started &nbsp;&nbsp;&nbsp;&nbsp;
                    </p>
                    <img src="/search.svg" className='w-[45px] translate-x-3' alt="" />
                </button>
            ) : (
                <button
                    onClick={handleMainButtonClick}
                    className="hidden"
                >
                    Click the search button to get started
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
                                    className="p-2 border-2 bg-[#D4E9F7] border-[#3498DB] text-blackrounded rounded-full w-full text-[18px]"
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
                                    className="p-2 border-2 text-black bg-[#D4E9F7] border-[#3498DB] rounded rounded-full w-full text-[18px]"
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
                                    className="p-2 border-2 text-black bg-[#D4E9F7] border-[#3498DB] rounded rounded-full w-full text-[18px]"
                                    name="gre"
                                    value={formData.gre}
                                    onChange={handleChange}
                                />
                            </div>
                        )}
                        {currentStep === 4 && (
                            <div className="mb-4 transition-opacity duration-500 ease-in-out transform translate-y-4">
                                <p className='text-[24px] font-[#600] font-bold pb-3'>What is your estimated budget (USD) for study costs?</p>
                                <input
                                    className="p-2 border-2 text-black bg-[#D4E9F7] border-[#3498DB] rounded rounded-full w-full text-[18px]"
                                    name="money"
                                    value={formData.money}
                                    onChange={handleChange}
                                />
                            </div>
                        )}
                    </div>


                    <div className='pt-2 pb-3 flex flex-row gap-3'>
                        <button
                            className="px-4 py-2 bg-[#fff] rounded-full border font-semibold border-[#3498DB] text-black rounded-md mt-4 mr-2"
                            onClick={handleBackButtonClick}
                            type="button"
                        >
                            Back
                        </button>
                        <button
                            className="px-4 py-2 bg-[#3498DB] rounded-full text-white font-semibold border border-[#3498DB] text-black rounded-md mt-4"
                            type="submit"
                        >
                            {currentStep < 4 ? 'Next' : 'Submit'}
                        </button>
                    </div>


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
