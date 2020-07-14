import React from 'react';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from "emoji-mart";


export default function EmojiPicker(props) {

    return(
        <Picker showPreview={false} onSelect={props.handleEmojiSelect}/>
    )
}
