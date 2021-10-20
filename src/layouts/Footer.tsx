import { AppBar, Container, IconButton, Toolbar, Typography } from "@mui/material"
import FacebookIcon from '@mui/icons-material/Facebook';


export default function Footer() {
    return (
        <AppBar position="static" color="primary">
          <Container maxWidth="xl">
            <Toolbar>
            <IconButton target="_blank" href="https://www.facebook.com/minh.phamquang.9883/"><FacebookIcon/></IconButton>
                <Typography variant="body1" color="inherit">
                    © {new Date().getFullYear()} PhamQuangMinh
                </Typography>
            </Toolbar>
          </Container>
        </AppBar>
    )
}