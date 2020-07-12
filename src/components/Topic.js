
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';

import requestimg from '../resources/request.png';
import walkerimg from '../resources/shoes.png';
import photoimg from '../resources/photograph.png';
import natureimg from '../resources/nature.png';
import alertimg from '../resources/alert.png';

// TODO: squish them to two classes
const useStyles = makeStyles((theme) => ({
    request: {
        backgroundColor: "#B5CDD0",
        width: "3.5vw",
        height: "3.5vw",
        borderRadius: "50%",
        marginRight: "5%",
        marginTop: "3%",
        backgroundImage: 'url(' + requestimg + ')',
        backgroundRepeat: "no-repeat",
        backgroundSize: "70%",
        backgroundPosition: "center",
    },
    walking: {
        backgroundColor: "#B5CDD0",
        width: "3.5vw",
        height: "3.5vw",
        borderRadius: "50%",
        marginRight: "5%",
        marginTop: "3%",
        backgroundImage: 'url(' + walkerimg + ')',
        backgroundRepeat: "no-repeat",
        backgroundSize: "70%",
        backgroundPosition: "center",
    },
    nature: {
        backgroundColor: "#B5CDD0",
        width: "3.5vw",
        height: "3.5vw",
        borderRadius: "50%",
        marginRight: "5%",
        marginTop: "3%",
        backgroundImage: 'url(' + natureimg + ')',
        backgroundRepeat: "no-repeat",
        backgroundSize: "70%",
        backgroundPosition: "center",
    },
    photo: {
        backgroundColor: "#B5CDD0",
        width: "3.5vw",
        height: "3.5vw",
        borderRadius: "50%",
        marginRight: "5%",
        marginTop: "3%",
        backgroundImage: 'url(' + photoimg + ')',
        backgroundRepeat: "no-repeat",
        backgroundSize: "70%",
        backgroundPosition: "center",
    },
    hint: {
        backgroundColor: "#B5CDD0",
        width: "3.5vw",
        height: "3.5vw",
        borderRadius: "50%",
        marginRight: "5%",
        marginTop: "3%",
        backgroundImage: 'url(' + alertimg + ')',
        backgroundRepeat: "no-repeat",
        backgroundSize: "70%",
        backgroundPosition: "center",
        [theme.breakpoints.down('sm')]: {},

    },
    pickedRequest: {
        backgroundColor: "#62AEBB",
        width: "4.2vw",
        height: "4.2vw",
        borderRadius: "50%",
        marginRight: "5%",
        marginTop: "3%",
        backgroundImage: 'url(' + requestimg + ')',
        backgroundRepeat: "no-repeat",
        backgroundSize: "70%",
        backgroundPosition: "center",
    },
    pickedWalking: {
        backgroundColor: "#62AEBB",
        width: "4.2vw",
        height: "4.2vw",
        borderRadius: "50%",
        marginRight: "5%",
        marginTop: "3%",
        backgroundImage: 'url(' + walkerimg + ')',
        backgroundRepeat: "no-repeat",
        backgroundSize: "70%",
        backgroundPosition: "center",
    },
    pickedNature: {
        backgroundColor: "#62AEBB",
        width: "4.2vw",
        height: "4.2vw",
        borderRadius: "50%",
        marginRight: "5%",
        marginTop: "3%",
        backgroundImage: 'url(' + natureimg + ')',
        backgroundRepeat: "no-repeat",
        backgroundSize: "70%",
        backgroundPosition: "center",
    },
    pickedPhoto: {
        backgroundColor: "#62AEBB",
        width: "4.2vw",
        height: "4.2vw",
        borderRadius: "50%",
        marginRight: "5%",
        marginTop: "3%",
        backgroundImage: 'url(' + photoimg + ')',
        backgroundRepeat: "no-repeat",
        backgroundSize: "70%",
        backgroundPosition: "center",
    },
    pickedHint: {
        backgroundColor: "#62AEBB",
        width: "4.2vw",
        height: "4.2vw",
        borderRadius: "50%",
        marginRight: "5%",
        marginTop: "3%",
        backgroundImage: 'url(' + alertimg + ')',
        backgroundRepeat: "no-repeat",
        backgroundSize: "70%",
        backgroundPosition: "center",
    },
}))

export default function Topic(props) {

    const classes = useStyles();

    // Pick an appropriate style
    let style;
    if(props.picked) {
        switch(props.type) {
            case 'Request':
                style = classes.pickedRequest;
                break;
            case 'Nature':
                style = classes.pickedNature;
                break;
            case 'Walking':
                style = classes.pickedWalking
                break;
            case 'Photo':
                style = classes.pickedPhoto;
                break;
            case 'Hint':
                style = classes.pickedHint;
                break;
            default:
                style = classes.pickedRequest;
                break;
        }
    }
    else {
        switch(props.type) {
            case 'Request':
                style = classes.request;
                break;
            case 'Nature':
                style = classes.nature;
                break;
            case 'Walking':
                style = classes.walking;
                break;
            case 'Photo':
                style = classes.photo;
                break;
            case 'Hint':
                style = classes.hint;
                break;
            default:
                style = classes.request;
                break;
        }
    }


    return (
        <Fab onClick={() => props.onClick(props.type)} className={style} />
    );
}