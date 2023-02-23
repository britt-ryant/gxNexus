import React from 'react';

//import functional components
import NavBar from './HeaderComponents/NavBar';
import Header from './HeaderComponents/Header';






class MainRouter extends React.Component{
    render(){
        return(
            <>
                <Header />
                <NavBar />
            </>
        )
    }
}


export default MainRouter;