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
    const [showEdit, setShowEdit] = useState(false);
    const handleClick = e => {
        if (node.current.contains(e.target)) {
          // inside click
          return;
        }
        // outside click
        setShowEdit(false);
        
      };
    const toggle = () => {
        if (showEdit){
            setShowEdit(false);
        }
        else{
            setShowEdit(true);
        }
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [showEdit]);
  return(
    <div ref={node} className="box">
        <div className="currentDate" onClick={toggle}> {months[month]+" "+year}</div>
        <div className={showEdit ? "splitContainer collapsed" : "splitContainer"} >
            <div className="leftMonth">
                {months.map((item, index) => (
                <button className={index.toString() === month.toString() ? "monthPickerButton selected": "monthPickerButton"} value={index} onClick={(event) => {
                    event.preventDefault();
                    setMonth(event.target.value);
                    props.setMonth(event.target.value)
                }} key={index}> {item}</button>))}
            </div>  
            <div className="rightYear">
                <MdKeyboardArrowUp id="scrollUp" onClick={() => {
                    document.getElementById("overflowYear").scrollBy({left:0,top: -50, behavior:'smooth'});
                }}></MdKeyboardArrowUp>
                <div id="overflowYear">
                {years.map((item, index) => (
                <button className={item.toString() === year.toString() ? "monthPickerButton selected": "monthPickerButton"} value={item} onClick={(event) => {
                    event.preventDefault();
                    setYear(event.target.value);
                    props.setYear(event.target.value)
                }} key={index}> {item}</button> 
                ))}
                </div>
                <MdKeyboardArrowDown id="scrollDown" onClick={() => {
                    document.getElementById("overflowYear").scrollBy({left:0,top: 50, behavior:'smooth'});
                }}></MdKeyboardArrowDown>
            </div>
            </div>
    </div>
  );
}

export default MonthPicker