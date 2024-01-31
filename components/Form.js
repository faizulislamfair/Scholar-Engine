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
        [[51000, 5, 320], [52000, 5.5, 310], [53000, 6, 320]],
        [[56000, 6, 330], [57000, 6.5, 320], [58000, 7, 330]]
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
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    name="money"
                    placeholder="Amount of Money"
                    value={formData.money}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="ielts"
                    placeholder="IELTS Score"
                    step="0.1"
                    value={formData.ielts}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="gre"
                    placeholder="GRE Score"
                    value={formData.gre}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
            {matchingPercentages.length > 0 && (
                <div>
                    {matchingPercentages.map((percentage, index) => (
                        <p key={index}>
                            Matching Percentage for Criteria {index + 1}: {percentage.toFixed(2)}%
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Form;


