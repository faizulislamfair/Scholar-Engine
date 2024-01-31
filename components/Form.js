import React, { useState } from 'react';
import * as tf from '@tensorflow/tfjs';

const Form = () => {
    const [formData, setFormData] = useState({
        money: '',
        ielts: '',
        gre: ''
    });

    const [matchingPercentages, setMatchingPercentages] = useState([]);

    const criteriaArrays = [
        [[51001, 6.1, 311], [52002, 6.2, 312], [53003, 6.3, 313]],
        [[56004, 6.4, 314], [57005, 6.5, 315], [58006, 6.6, 316]],
        [[51007, 6.7, 317], [52008, 6.8, 318], [53009, 6.9, 319]],
        [[56010, 7.0, 320], [57011, 7.1, 321], [58012, 7.2, 322]],
        [[51013, 7.3, 323], [52014, 7.4, 324], [53015, 7.5, 325]],
        [[56016, 7.6, 326], [57017, 7.7, 327], [58018, 7.8, 328]],
        [[51019, 7.9, 329], [52020, 8.0, 330], [53021, 8.1, 331]],
        [[56022, 8.2, 332], [57023, 8.3, 333], [58024, 8.4, 334]],
        [[51025, 8.5, 335], [52026, 8.6, 336], [53027, 8.7, 337]],
        [[56028, 8.8, 338], [57029, 8.9, 339], [58030, 9.0, 340]]
    ];


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        calculateMatching();
    };

    const calculateMatching = () => {
        const inputData = tf.tensor2d([
            [
                parseFloat(formData.money),
                parseFloat(formData.ielts),
                parseFloat(formData.gre)
            ]
        ]);

        const allPercentages = criteriaArrays.map(criteria => {
            const criteriaData = tf.tensor2d(criteria);
            const matches = inputData.greaterEqual(criteriaData).sum().arraySync();
            return (matches / (criteria.length * 3)) * 100;
        });

        setMatchingPercentages(allPercentages);
    };



    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center justify-center p-4 bg-white shadow-md rounded-lg max-w-md mx-auto my-8"
            >
                <input
                    className="p-2 mb-4 w-full border-2 border-gray-200 rounded-md"
                    type="number"
                    name="money"
                    placeholder="Amount of Money"
                    value={formData.money}
                    onChange={handleChange}
                />
                <input
                    className="p-2 mb-4 w-full border-2 border-gray-200 rounded-md"
                    type="number"
                    name="ielts"
                    placeholder="IELTS Score"
                    step="0.1"
                    value={formData.ielts}
                    onChange={handleChange}
                />
                <input
                    className="p-2 mb-4 w-full border-2 border-gray-200 rounded-md"
                    type="number"
                    name="gre"
                    placeholder="GRE Score"
                    value={formData.gre}
                    onChange={handleChange}
                />
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    type="submit"
                >
                    Submit
                </button>
            </form>


            {matchingPercentages.length > 0 && (
                <div>
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


