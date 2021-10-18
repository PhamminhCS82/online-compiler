import { AppBar, Toolbar, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '20vh',
        
    },
    headerControl:{
        display:'flex',
        justifyContent: 'space-evenly',
    },
}));


export default function Header() {
    const classes = useStyles();
    return (
        <AppBar elevation={2}>
            <Toolbar>
                <div className={classes.headerControl}>
                    <Typography variant='h6' padding={2}>Welcome to OU Code</Typography>
                </div>
            </Toolbar>
        </AppBar>
    )
}