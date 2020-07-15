import React, {useRef, useState, useEffect} from 'react';
import {MdKeyboardArrowUp, MdKeyboardArrowDown} from 'react-icons/md';
import './monthPicker.scss';
function range(lowEnd, highEnd){
    let list = [];
    for (let i = lowEnd; i <= highEnd; i++) {
        list.push(i);
    }
    return list.sort(function(a, b){return b-a});
}


function MonthPicker(props){
    const node = useRef();
    const [month, setMonth] = useState(props.month);
    const [year, setYear] = useState(props.year);
    const months = ["Jan", "Feb", "Mar", "Apr", 
                    "May", "Jun", "Jul", "Aug",
                    "Sep", "Oct", "Nov", "Dec"]
    const years = range(props.minYear, new Date().getFullYear())
    const handleClick = e => {
        if (node.current.contains(e.target)) {
          // inside click
          return;
        }
        // outside click
        let box = node.current;

        if (box.querySelector('.splitContainer').classList.contains('collapsed')){
            console.log(e.target);
            box.querySelector('.splitContainer').classList.toggle('collapsed');
        }
        
      };
    useEffect(() => {
        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);
  return(
    <div ref={node} className="box">
        <div className="currentDate" onClick={() => {
        node.current.querySelector('.splitContainer').classList.toggle('collapsed');
    }}> {months[month]+" "+year}</div>
        <div className='splitContainer' >
            <div className="leftMonth">
                {months.map((item, index) => (
                <button className="monthPickerButton" value={index} onClick={(event) => {
                    event.preventDefault();
                    setMonth(event.target.value);
                    props.setMonth(event.target.value)
                }} key={index}> {item}</button>))}
            </div>  
            <div className="rightYear">
                <MdKeyboardArrowUp id="scrollUp" onClick={() => {
                    document.getElementById("overflowYear").scrollBy({left:0,top: -50, behavior:'smooth'});
                    console.log("Scroll"); 
                }}></MdKeyboardArrowUp>
                <div id="overflowYear">
                {years.map((item, index) => (
                <button className={item === year ? "monthPickerButton selected": "monthPickerButton"} value={item} onClick={(event) => {
                    console.log(item, index);
                    event.preventDefault();
                    setYear(event.target.value);
                    props.setYear(event.target.value)
                }} key={index}> {item}</button> 
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

export default MonthPicker