import React, {useRef, useState} from 'react';
import {MdKeyboardArrowUp, MdKeyboardArrowDown} from 'react-icons/md';
import './view.scss';
function range(lowEnd, highEnd){
    let list = [];
    for (let i = lowEnd; i <= highEnd; i++) {
        list.push(i);
    }
    return list;
}


function MonthPicker(){
    const buttonRef = useRef();
    const [month, setMonth] = useState('Jan');
    const [year, setYear] = useState('1990');
    const months = ["Jan", "Feb", "Mar", "Apr", 
                    "May", "Jun", "Jul", "Aug",
                    "Sep", "Oct", "Nov", "Dec"]
    const years = range(1940, new Date().getFullYear())
  return(
    <div className="box">
        <div className="currentDate" onClick={() => {
            document.querySelector('.splitContainer').classList.toggle('collapsed');
        }}> {month+" "+year}</div>
        <div className='splitContainer' >
            <div className="leftMonth">
                {months.map((item, index) => (
                <button className="monthPickerButton" value={item} onClick={(event) => setMonth(event.target.value)} key={index}> {item}</button>))}
            </div>  
            <div className="rightYear">
                <MdKeyboardArrowUp id="scrollUp" onClick={() => {
                    document.getElementById("overflowYear").scrollBy({left:0,top: -50, behavior:'smooth'});
                    console.log("Scroll"); 
                }}></MdKeyboardArrowUp>
                <div id="overflowYear">
                {years.map((item, index) => (
                <button className="monthPickerButton" value={item} onClick={(event) => setYear(event.target.value)} key={index}> {item}</button> 
                ))}
                </div>
                <MdKeyboardArrowDown id="scrollDown" onClick={() => {
                    document.getElementById("overflowYear").scrollBy({left:0,top: 50, behavior:'smooth'});
                    console.log("Scroll"); 
                }}></MdKeyboardArrowDown>
            </div>
            </div>
    </div>
  );
}



function View(){
    return (
        <div className="viewPage">
        <MonthPicker></MonthPicker>
        </div>
    )
}

export default View;