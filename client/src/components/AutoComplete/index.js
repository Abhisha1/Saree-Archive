import React, {useState, useEffect} from 'react';
import * as Validation from '../../validation/stringSanitising.js';
import Tag from '../../components/Tag';
import { toast, ToastContainer } from 'react-toastify';
import "./autoComplete.scss";

function AutoComplete(props){
    const [suggestedTags, setSuggestedTags] = useState(props.allOptions)
    const [tags, setTags] = useState([]);
    const handleKeyDown = (event) => {
        if(event.key === "Enter"){
            event.preventDefault();
            if(!tags.includes(event.target.value)){
                let value = Validation.cleanTrailingSpaces(event.target.value);
                if (value.length !== 0){
                    setTags(tags => [...tags, value]);
                }
            }
            else{
                toast("You already have entered this tag")
            }
            event.target.value = "";
        }
    }
    const remove = (index) => {
        let newTags = [...tags];
        console.log(index);
        if (index!== -1){
            newTags.splice(index,1)
            setTags(newTags);
        }
    }
    const getSuggestions = (event) => {
        let suggestions = [];
        props.allOptions.forEach((item) => {
            if (item.toLowerCase().startsWith(event.target.value.toString().toLowerCase())){
                suggestions.push(item);
            }
        })
        setSuggestedTags(suggestions);
        if (!document.getElementById("autoCompleteCollapsible").classList.contains("show")){
            document.getElementById("autoCompleteCollapsible").classList.toggle("show")
        }
    }
    useEffect(() => {
        props.action(tags);
    }, [tags])
    return(
        <div className="autoCompleteContainer">
            <ToastContainer />
        <input id="autoCompleteInput" type="text" placeholder="Enter a tag" className="form-control" aria-label="Tags to filter by" onChange={getSuggestions} onKeyDown={handleKeyDown}></input>
        <div id="autoCompleteCollapsible">
            {suggestedTags.map((item, index) => (
                <option id="autoCompleteSuggestion" onClick={() => {
                    document.getElementById("autoCompleteInput").value = item;
                    document.getElementById("autoCompleteCollapsible").classList.toggle("show")}} key={index}>{item}</option>
            ))}
        </div>
        <div className="tags">
            {tags.length > 0 &&
            tags.map((item,index) => (
                <Tag remove={remove} key={index} index={index} item={item}></Tag>
            ))
            }
        </div>
        </div>
    );

}
export default AutoComplete