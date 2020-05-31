import React from "react";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import "./add.scss";

function Add() {
    return (
        <form>
            <div class="form-group">
                <label for="exampleFormControlSelect1">Location</label>
                <select class="form-control" id="exampleFormControlSelect1">
                    <option>Blue Suitcase</option>
                    <option>Red Suitcase</option>
                    <option>Black Suitcase</option>
                </select>
            </div>
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Notes</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <div class="form-group">
                <label>Blouse Stitched</label>
                <br />
                <ToggleButtonGroup type="radio" name="sizes" defaultValue={"Yes"}>
                    <ToggleButton variant="secondary" name="size" value={"Yes"}>
                        Yes
                        </ToggleButton>
                    <ToggleButton variant="secondary" name="size" value={"No"}>
                        No
                        </ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Last worn</label>
                
            </div>
        </form>
    )
}

export default Add;
