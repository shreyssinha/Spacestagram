import React, { useState, Component } from "react";
import Photo from "./Components/Photo.js";
import "./App.css";


//////////////////////////////////////////////////////////////////////////////////////
const subDate = (date_string) => {
  var year = parseInt(date_string.substring(0,4));
  var month = parseInt(date_string.substring(5,7));
  var date = parseInt(date_string.substring(8,10));

  if (month === 1) { // go back a year
      if (date === 1) {
          year--;
          month = 12;
          date = 31;
      } else date--;
  }

  else if (month === 12 || month === 5 || month === 7 || // go back to 30
          month === 8 || month === 10) {
      if (date === 1) {
          month--;
          date = 30;
      } else date--;
  }

  else if (month === 2 || month === 4 || month === 6 || // go back to 31
          month === 9 || month === 11) {
      if (date === 1) {
          month--;
          date = 31
      } else date--;
  }
      
  else if (month === 3) { // go back to 29 or 28
      if (date === 1) {
          if (year % 400 === 0) {// 29
              month--;
              date = 29;
          } else if (year % 100 === 0) {
              month--;
              date = 28;
          } else if (year % 4 === 0) {
              month--;
              date = 29;
          } else {
              month--;
              date = 28;
          }
      } else date--;
  }

  //Convert to string
  var result = year.toString() + "-";
  if (month < 10) result += "0" + month.toString() + "-";
  else result += month.toString() + "-";
  if (date < 10) result += "0" + date.toString();
  else result += date.toString();

  return result;
}
////////////////////////////////////////////////////////////////////////////////////

const currentDateToString = () => {

  var d = new Date();

  var year = d.getFullYear().toString();
  var month = d.getMonth().toString();
  var date = d.getDate().toString();
  

  var currentDate = year + "-";
  if (month < 10) currentDate += "0" + month.toString() + "-";
  else currentDate += month.toString() + "-";
  if (date < 10) currentDate += "0" + date.toString();
  else currentDate += date.toString();

  return currentDate;
}
////////////////////////////////////////////////////////////////////////////////////

const addDate = (date_string) => {
    var year = parseInt(date_string.substring(0,4));
    var month = parseInt(date_string.substring(5,7));
    var date = parseInt(date_string.substring(8,10));
  
    if (month === 1 || month === 3 || month === 5 ||
        month === 7 || month === 8 || month === 10) {
            if (date === 31) {
                date = 1;
                month++;
            } else date++;
    }

    else if (month === 4 || month === 6 || 
        month === 9 || month === 11) {
            if (date === 30) {
                date = 1;
                month++;
            } else date++;
    }

    else if (month === 2) {
        if (year % 400 === 0) {
            if (date === 29) {
                date = 1;
                month++;
            } else date++;
        }
        else if (year % 100 === 0) {
            if (date === 28) {
                date = 1;
                month++;
            } else date++;
        }
        else if (year % 4 === 0) {
            if (date === 29) {
                date = 1;
                month++;
            } else date++;
        }
        else {
            if (date === 28) {
                date = 1;
                month++;
            } else date++;
        }
    }

    else if (month === 12) {
        if (date === 31) {
            month = 1;
            year++;
            date = 1;
        } else date++;
    }

  
    //Convert to string
    var result = year.toString() + "-";
    if (month < 10) result += "0" + month.toString() + "-";
    else result += month.toString() + "-";
    if (date < 10) result += "0" + date.toString();
    else result += date.toString();
  
    return result;
}
////////////////////////////////////////////////////////////////////////////////////

function App() {

  const [date, setDate] = useState(currentDateToString())

  return (
    <div>
        <h1>Spacestagram</h1>
        <h3>Brought to you by NASA APOD API...</h3>
      <Photo date = {date}/>
      <div class="pagination">
        <a onClick = {() => setDate(addDate(date))}>❮</a>
        <a onClick = {() => setDate(subDate(date))}>❯</a>
        </div>
      </div>
    );
}

export default App;