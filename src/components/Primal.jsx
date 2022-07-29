import React from 'react'
import { useEffect, useState } from 'react';
import styled from 'styled-components'
import { Splide, SplideSlide} from '@splidejs/react-splide'
import "@splidejs/splide/dist/css/splide.min.css"

const Primal = () => {
  const [primal,setPrimal] = useState([]);

  useEffect(()=>{
    getPopular();
  }, [])

  const getPopular = async ()=>{
    const check = localStorage.getItem("popular")

    if(check){
        setPrimal(JSON.parse(check))
    } else {
        const api = await fetch(
            `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=8`
        )
        const data = await api.json()
        localStorage.setItem("popular", JSON.stringify(data.recipes))
        setPrimal(data.recipes)
    }

    const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=8&tags=primal)
    const data = await api.json();
    setPrimal(data.recipes)
  };

 return (
               <Wrapper>
                 <h3>Liver King Inspired Primal Dishes</h3>
                <Splide options={{
                    perPage: 3,
                    arrows: false,
                    pagination: false,
                    drag: 'free',
                    margin: '5rem',
                }}>
                   {primal.map((recipe) => {
                      return(
                        <SplideSlide key={recipe.id}>
                            <Card>
                                <p>{recipe.title}</p>
                                <img src={recipe.image} alt={recipe.titel} />
                                <Gradient/>
                            </Card>
                        </SplideSlide>
                      )
                   })}
                </Splide>
               </Wrapper>
  )
}

const Wrapper = styled.div`
 margin: 4rem 0rem;
`;

const Card = styled.div`
 min-height: 20rem;
 border-raduis: 2rem;
 overflow: hidden;
 postion: relative;
`
 img {
    border-radius: 2rem;
    postion: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit cover;
 }
 p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    tranform: translate(-50%, 0%);
    color: black;
    width: 100%;
    text-align: center;
    font-weight: 700;
    font-size: 2rem;
    height: 40%;
    display: felx;
    justify-content: center;
    align-items: center;
 }
`;

const Gradient = styled.div`
 z-index: 3;
 postion: absolute;
 width: 100%;
 height: 100%;
 background: linear-gradient(black, rgba(0,0,0,0.5));
`


export default Primal
