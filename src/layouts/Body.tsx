import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Compiler from '../pages/Compiler';


export default function Body() {
    return (
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route exact path="/" component={Compiler}/>
            </Switch>
            <Footer/>
        </BrowserRouter>
    )
}