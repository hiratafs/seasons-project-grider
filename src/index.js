import React from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import { SeasonDisplay } from './SeasonDisplay';
import {Spinner} from './Spinner';

/* const App = () => {
    window.navigator.geolocation.getCurrentPosition(
        (position) => console.log(position),
        (err) => console.log(err)
    )
    return(
     <h1>Latitude</h1>
    )
} */

class App extends React.Component {

     state = {lat: null, errorMessage:''}

 /*    componentDidMount() {
        console.log('My component was rendered to the screen')
    }

    componentDidUpdate() {
        console.log('My component was just updated - it rerendered!')
    } */

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({lat: position.coords.latitude}),
            
            err => this.setState({errorMessage:err.message})
        )
    }


    renderContent() {
        if(this.state.errorMessage && !this.state.lat) {
            return <h2>Error: {this.state.errorMessage}</h2>
         }  else if(!this.state.errorMessage && this.state.lat) {
             return <SeasonDisplay lat={this.state.lat} />
         } else {
             return <Spinner message="Please accept location request"/>
         }
    }

    render() {
        return(
            <div className="border red">
                {this.renderContent()}
            </div>
        )
    }
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>)