import React from 'react';
import PropTypes from 'prop-types';
import TeachingApi from '../../api/TeachingApi';

TeachingPage.propTypes = {
    
};

function TeachingPage(props) {

    const onClick = async() => {
        try {
            const data = await TeachingApi.getAll();
        } catch (error) {
            console.log(error
            
            );
        }
    }

    return (
        <div>
            Dậy học
            <div>
                <button onClick={onClick}>Click</button>
            </div>
        </div>
    );
}

export default TeachingPage;