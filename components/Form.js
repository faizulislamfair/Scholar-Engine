import React from 'react';
import { useState } from 'react';


const Form = () => {

    const [formData, setFormData] = useState({
        money: '',
        ielts: '',
        gre: ''
    });
    const [matchingPercentage, setMatchingPercentage] = useState(null);

    const criteria = [
        [51000, 5, 320],
        [52000, 5.5, 310]
        [53000, 6, 320],
        [54000, 6.5, 310]
        [55000, 7, 320],
        [56000, 7.5, 320]
        [57000, 8, 320],
        [58000, 8, 330]
        [59000, 8, 340],
        [60000, 8, 340]
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        calculateMatching();
    };

    const calculateMatching = () => {
        let matches = 0;
        criteria.forEach((criterion) => {
            if (
                formData.money >= criterion[0] &&
                formData.ielts >= criterion[1] &&
                formData.gre >= criterion[2]
            ) {
                matches++;
            }
        });
        setMatchingPercentage((matches / criteria.length) * 100);
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
            {matchingPercentage !== null && (
                <p>Matching Percentage: {matchingPercentage.toFixed(2)}%</p>
            )}
        </div>
    );
};

export default Form;


