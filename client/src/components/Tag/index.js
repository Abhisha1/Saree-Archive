import React from 'react';
import { MdClear} from "react-icons/md";
import './tag.scss';

export default function Tag(props) {
    return (
      <div className="tag">
        {props.item}
        <span
          id="tagSpan" key={props.index}
          onClick={() => {
            props.remove(props.index);
          }}
        >
          <MdClear className="tagRemove" />
        </span>
      </div>
    );
  }