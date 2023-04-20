import React from 'react'
import axios from 'axios';
import './App.css'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: "",
      longitude: "",
      userAddress: ""
    }
    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    this.reverseGeocodeCoordinates = this.reverseGeocodeCoordinates.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCoordinates, this.handleLocationError);
    }
    else {
      alert("Geolocation is not supported by this browser.")
    }
  }

  getCoordinates(position) {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
    this.reverseGeocodeCoordinates();
  }
  reverseGeocodeCoordinates() {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}&sensor=false&key=AIzaSyB4nJ_35oFFm0vh6dBeXdncZfWc7Jouhwc`)
      .then(response => response.json())
      .then(data => this.setState({
        userAddress: data.results[0].formatted_address
      }))
      .catch(error => alert(error))
  }

  handleLocationError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.")
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        break;
      default:
        alert("An unknown error occurred.")

    }
  }
  handleSubmit = e => {
    console.log(this.state);
    axios.post('https://jsonplaceholder.typicode.com/posts', this.state)
    .then(response =>{
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    return (

      <div className='App'>
        <h2>Police Personnel Location</h2>
        <button onClick={this.getLocation}>Get Coordinates</button>
        <h4>Coordinates</h4>
        <p>Latititude: {this.state.latitude}</p>
        <p>Longitude: {this.state.longitude}</p>
        <h4>Google Maps Reverse Geocoding</h4>
        <p>Address: {this.state.userAddress}</p>
        {
          this.state.latitude && this.state.longitude ?
            <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${this.state.latitude},${this.state.longitude}&zoom=14&size=400x300&sensor=false&markers=color:red%7C${this.state.latitude},${this.state.longitude}&key=AIzaSyB4nJ_35oFFm0vh6dBeXdncZfWc7Jouhwc`} alt="" />
            : null
        }
        {this.state.userAddress &&  <button className="submit--button" onClick={this.handleSubmit}>Submit</button>}
        
      </div>

    )
  }
}




export default App
