import React from 'react';

const inputFields = (props) => {
    return (
        <div className="InputFields">
            <input id="inputDogName" type="text" placeholder="Enter a name"/>
            <input id="inputDogAge" type="Number" placeholder="Enter an age"/>
            <input id="inputDogSpecies" type="text" placeholder="Enter a species"/>
            <button onClick={this.togglePersonsHandler}>Create dawg</button>
        </div>
    )
};

export default inputFields;