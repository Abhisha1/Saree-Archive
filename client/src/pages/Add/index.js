import React from "react";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import "./add.scss";

function Add() {
    return (
        <form>
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                    <img src="..." class="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item">
                    <img src="..." class="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item">
                    <img src="..." class="d-block w-100" alt="..." />
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
                </div>
            <div class="custom-file">
                <input type="file" class="custom-file-input" id="customFile" />
                <label class="custom-file-label" for="customFile">Choose file</label>
            </div>
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
