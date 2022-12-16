import './App.css';
import React, { useEffect, useState } from 'react';
export default function App() {


  const [data, setdata] = useState([])
  const [allsearch, setAllsearch] = useState("")
  const [allList, setAllList] = useState([])
  const [strMeal, setStrMeal] = useState("")




  const getData = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    const result = await response.json()
    setdata(result.meals)
    console.log(data)

  }
  const searchbar = !allsearch ? data : data.filter((item) =>
    item.strCategory.toLowerCase().includes(allsearch.toLowerCase()))

  useEffect(() => {
    getData()
  }, [])

  return (
    <div id="header">
      <h1 id="fontword">TheMealDB</h1>
      <h1 id="mainheading">Welcome to TheMealDB</h1>
      <h5 id="secondline">Welcome to TheMealDB: An open, crowd-sourced database of Recipes from around the world.</h5>
      <h5 id="thirdline">We also offer a <span id="colore">free JSON API</span> for anyone wanting to use it, with additional features for subscribers.</h5>
      <img id="boul" src='https://www.themealdb.com/images/meal-icon.png' alt=""></img>
      <input id="searchBtn" type="text" placeholder='search Here...' onChange={(e) => {
        setAllsearch(e.target.value)
      }} />

      <div id="box">
        {
          searchbar.map((item, index) => {
            return (
              <div key={index}>
                <h3 style={{ marginLeft: "50px", color: "rgb(173, 85, 13)" }}>{item.idMeal}</h3>
                <img id="mealimg" src={item.strMealThumb} ></img><br></br>
                <h3 style={{ color: "rgb(173, 85, 13)", marginLeft: "50px" }}>{item.strMeal}</h3>
                <h3 style={{ color: "rgb(173, 85, 13)", marginLeft: "50px" }}>$ 100</h3>
                <button style={{ marginLeft: "50px" }} onClick={() => {
                  let temObj = {
                    "strMeal": item.strMeal,
                    "strMealThumb": item.strMealThumb,
                    price: 100
                  }
                  console.log(temObj)
                  setAllList([...allList, temObj])
                  console.log(allList)
                }}>Add to cart</button>

              </div>
            )
          })
        }
      </div>
      <div> <h1 style={{ marginLeft: "500px", fontSize: "30px", color: "yellow" }}>Add to cart Data(invoise)</h1></div>
      {
        allList.map((item, index) => {
          return (
            <div id="datashow">
              <h1 style={{ color: "white", marginLeft: "500px" }}>DishName- {item.strMeal}</h1>
              <h1 style={{ color: "white", marginLeft: "500px" }}> price-{item.price}</h1>
              <img style={{ width: "200px", hight: "200px", marginLeft: "550px" }} src={item.strMealThumb}></img>
            </div>
          )
        }
        )
      }
      <div><h1 style={{ color: "white", marginLeft: "550px" }}>Total Amount :</h1>
        <h1 style={{ marginLeft: "550px", color: "white" }}>{allList.length * 100}rs</h1></div>
    </div>


  )
}

