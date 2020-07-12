import React, { useState, useEffect } from 'react';
import { MdAddCircle } from "react-icons/md";
import { ReactComponent as Mandala } from '../../assets/homepage.svg';
import './imageUpload.scss';

export default function ImageUpload(props) {
    const [previewImage, setpreviewImage] = useState([]);
    const [sarees, setSarees] = useState(props.saree);
    const [currentViewIndex, setCurrentViewIndex] = useState(0);

    useEffect(() => {
        props.action(sarees);
    }, [sarees])
    return (
        <div>
            <p className="descriptionText">Upload an image of your saree</p>
            {
                props.saree.length !== 0 ?
                    <div className="imagePreviewGallery">
                        <img className="previewImage" alt="your saree" src={previewImage[currentViewIndex]} />
                        <div className="imagePickerGroup">
                        {
                            previewImage.map((item, index) => (
                                <div key={index} customshow={index === currentViewIndex ? 'hide': 'show'} id="selected">
                                <Mandala id="imagePicker" key={index} onClick={() => setCurrentViewIndex(index)} ></Mandala>
                                </div>
                            ))
                        }
                        </div>
                        <label htmlFor="myfile">
                            <div id="addImageButton">
                                <MdAddCircle id="addMoreImagesButton"></MdAddCircle>
                                <span id="addImageTextButton">Upload another</span>
                            </div>
                            <input type="file" id="myfile" accept="image/*" onChange={(event) => {
                                let localFile = event.target.files[0];
                                setSarees(sarees => [...sarees, localFile]);
                                setpreviewImage(previewImage => [...previewImage, URL.createObjectURL(localFile)]);
                                
                            }} />
                        </label>
                    </div>
                    :
                    
                    <div id="placeholderImage">
                        <label htmlFor="myfile" id="uploadButton">Upload</label>
                        <input type="file" id="myfile" accept="image/*" onChange={(event) => {
                            let localFile = event.target.files[0];
                            setSarees(sarees => [...sarees, localFile]);
                            setpreviewImage(previewImage => [...previewImage, URL.createObjectURL(localFile)]);
                        }} />
                    </div>

            }
        </div>
    )
}