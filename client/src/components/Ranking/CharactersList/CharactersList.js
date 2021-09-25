import React, {useState} from 'react';
import CharacterRow from "./CharacterRow";
import {Grid, List, ListItem, ListItemButton, ListItemText, Paper} from "@mui/material";
import {useSelector} from "react-redux";

const CharactersList = ( ) => {
    const { list } = useSelector(state => state?.ranking) || [];

    return (
        <Paper elevation={5}>
            <List>
                <Grid container>
                    <ListItem>
                        <ListItemButton disabled>
                            <Grid item xs={12} sm={4}>
                                    <ListItemText>Nickname</ListItemText>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                    <ListItemText>Level</ListItemText>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                    <ListItemText>Vocation</ListItemText>
                            </Grid>
                        </ListItemButton>
                    </ListItem>
                    {
                        list?.map( character => (
                            <ListItem key={character._id}>
                                <CharacterRow character={character} />
                            </ListItem>
                        ))
                    }
                </Grid>
            </List>
        </Paper>
    );
};

export default CharactersList;