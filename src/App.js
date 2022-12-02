// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {
  const APP_ID = '7bf63da1';
  const APP_KEY = 'cf4f6818819882b834541a30214b0c09';

  const [Recipes, setRecipes] = useState([]);
  const [tempRecipes, setTempRecipes] = useState([]);
  const [Search, setSearch] = useState('');
  const [Query, setQuery] = useState('');
  const [Health, setHealth] = useState('alcohol-free');
  const [Diet, setDiet] = useState('balanced');

  useEffect(() => {
    (async () => getRecepies())();
  }, [Query, Health, Diet]);

  useEffect(()=>{
    setRecipes(tempRecipes);
  }, [tempRecipes])

  const exampleRed = `https://api.edamam.com/search?q=${Query}&app_id=${APP_ID}&app_key=${APP_KEY}&diet=${Diet}&health=${Health}`;

  const getRecepies = async () => {
    const response = await fetch(exampleRed);
    const data = await response.json();
    setTempRecipes(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    // e.preventDefault();
    setQuery(Search);
    setHealth(document.getElementById('health').value);
    setDiet(document.getElementById('diet').value);
    setSearch('');
    // window.location = '#recipe';
  };

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <div className='App'>
      <div className='navbar'>
        <div id='logo'>
          <h2>P-Foodies</h2>
        </div>
        <div className='search-form'>
          <select className='dropdown' id='health'>
            <option style={{ padding: '5px', margin: '2px' }} value='alcohol-free'> Alcohol Free</option>
            <option style={{ padding: '5px', margin: '2px' }} value='tree-nut-free'> Tree Nut free </option>
            <option style={{ padding: '5px', margin: '2px' }} value='peanut-free'> Peanut Free </option>
            <option style={{ padding: '5px', margin: '2px' }} value='sugar-conscious'> Sugar Conscious </option>
            <option style={{ padding: '5px', margin: '2px' }} value='vegan'> Vegan </option>
            <option style={{ padding: '5px', margin: '2px' }} value='vegetarian'> Vegetarian </option>
          </select>
          <select className='dropdown' id='diet'>
            <option value='balanced'> Balanced </option>
            <option value='high-protein'> High Protein </option>
            <option value='low-carb'> Low Carb </option>
            <option value='low-fat'> Low Fat </option>
          </select>
          <input
            className='search-bar'
            type='text'
            value={Search}
            onChange={updateSearch}
          />
          <button onClick={getSearch} className='search-button'>
            View
          </button>
        </div>
      </div>
      <h1 className='header'>Welcome to P-Foodies</h1>
      <div id='head'>
        <h1 className='heading'>{capitalize(Query)} Recipes</h1>
        <div className='recipes'>
          {Recipes.map((recipe, index) => (
            <Recipe
              key={index}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories.toFixed(5)}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
