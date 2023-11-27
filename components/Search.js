import { useState } from 'react';
import { data } from '@/public/data';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredData = data.filter(item => {

        const searchValue = searchTerm.toLowerCase();
        return (
            item.first_name.toLowerCase().includes(searchValue) ||
            item.last_name.toLowerCase().includes(searchValue) ||
            item.email.toLowerCase().includes(searchValue)
        );
    });

    return (
        <div style={{ margin: '30px', padding: '20px' }}>
            <h1>Search</h1>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul>
                {filteredData.map(item => (
                    <li key={item.id}>
                        {item.first_name} {item.last_name} - {item.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Search;
