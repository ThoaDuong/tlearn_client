import React from "react"
import { VocaCard } from "./VocaCard"
import { Grid } from "@mui/material"
import Vocabulary from "../../interfaces/Vocabulary"

type VocaListCardProps = {
    listFilterVoca: Vocabulary[]
}

export const VocaListCard = (props: VocaListCardProps) => {
    return (<React.Fragment>
        <Grid container spacing={2}>
            { props.listFilterVoca.map((voca: Vocabulary) => 
                <Grid key={voca.id} item xs={12} sm={6} md={4} lg={3}>
                    <VocaCard  voca={voca}/>
                </Grid>
            ) }
        </Grid>
    </React.Fragment>)
}