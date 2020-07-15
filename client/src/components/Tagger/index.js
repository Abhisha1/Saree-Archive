import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import * as Validation from '../../validation/stringSanitising.js';
import Tag from '../../components/Tag';


function Tagger(props){
    const [tags, setTags] = useState(props.tags);
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
    useEffect(() => {
        props.action(tags);
    }, [tags])
    return (
        <div>
            <ToastContainer />
        <h2 className="addSubHeading">
                Tags
            <p className="descriptionText">Any tags to describe your saree</p>
            </h2>
                <input type="text" field="tags" onKeyDown={handleKeyDown} className="form-control" aria-label="Additional notes" placeholder="Beaded"></input>
            <div className="tags">
                {tags.length > 0 &&
                tags.map((item,index) => (
                    <Tag remove={remove} key={index} index={index} item={item}></Tag>
                ))
                }
            </div>
        </div>
)
}
export default Tagger;