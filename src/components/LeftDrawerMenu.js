import React, {useState} from 'react';
import { Drawer, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    menuElement: {
        width: "15vw",
        padding: theme.spacing(1)
    }
}));

export default function LeftDrawerMenu(props) {

    const classes = useStyles();

    return(
        <Drawer anchor='left' open={props.open} onClose={props.onClose}>
            <Typography variant="h6" className={classes.menuElement}>
                Test
            </Typography>
        </Drawer>
    );
}