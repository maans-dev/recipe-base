import React from 'react'
import { useEffect, useState } from 'react';
import styled from 'styled-components'

const Popular = () => {

  const [popular,setPopular] = useState([]);

  useEffect(()=>{
    getPopular();
  }, [])

  const getPopular = async ()=>{
    const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=8`)
    const data = await api.json();
    setPopular(data.recipes)
  };

  return (
    <div>

      {popular.map((recipe) => {
        return (
        <div key={recipe.id}>
          <p>{recipe.title}</p>
        </div>);
      })}

    </div>
  )
};

export default Popular