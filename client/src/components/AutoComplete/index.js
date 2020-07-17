import React, {useState, useEffect} from 'react';
import * as Validation from '../../validation/stringSanitising.js';
import Tag from '../../components/Tag';
import { toast } from 'react-toastify';
import "./autoComplete.scss";

function AutoComplete(props){
    const [suggestedTags, setSuggestedTags] = useState(props.allOptions)
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState('');
    const [showCollapsile, setShowCollapsible] = useState("");
    const handleKeyDown = (event) => {
        if(event.key === "Enter"){
            addEvent(event);
        }
    }
    const addEvent = (event) => {
        event.preventDefault();
        if(!tags.includes(event.target.value)){
            let value = Validation.cleanTrailingSpaces(event.target.value);
            if (value.length !== 0){
                setTags(tags => [...tags, value]);
                if(showCollapsile === ""){
                    setShowCollapsible("show")
                }
            }
        }
        else{
            toast("You already have entered this tag")
        }
        setTag("");
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
        setTag(event.target.value);
        props.allOptions.forEach((item) => {
            if (item.toLowerCase().startsWith(event.target.value.toString().toLowerCase())){
                suggestions.push(item);
            }
        })
        setSuggestedTags(suggestions);
        if(showCollapsile === ""){
            setShowCollapsible("show")
        }
    }
    useEffect(() => {
        props.action(tags);
        setTag("");
        setShowCollapsible("")
    }, [tags])
    return(
        <div>
        
        <div className="autoCompleteContainer">
            <div className="flexRow">
            <input id="autoCompleteInput" type="text" value={tag} placeholder="Enter a tag" className="form-control" aria-label="Tags to filter by" onClick={getSuggestions} onChange={getSuggestions} onKeyDown={handleKeyDown}></input>
            <button id="modalButton" className="addButton btn btn-secondary" onClick={(event) => {event.preventDefault();
            if(!tags.includes(tag)){
                let value = Validation.cleanTrailingSpaces(tag);
                if (value.length !== 0){
                    setTags(tags => [...tags, tag]);
                }
            }
            else{
                toast("You already have entered this tag")
            }
            setTag("")}}>Add</button>
        </div>
        <div id="autoCompleteCollapsible" className={showCollapsile}>
            {suggestedTags.map((item, index) => (
                <option id="autoCompleteSuggestion" onClick={() => {
                    setTag(item);
                    if(!tags.includes(tag)){
                        let value = Validation.cleanTrailingSpaces(item);
                        if (value.length !== 0){
                            setTags(tags => [...tags, item]);
                        }
                    }
                    else{
                        toast("You already have entered this tag")
                    }}} key={index}>{item}</option>
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
        </div>
    );

}
export default AutoComplete