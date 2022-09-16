import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-widget-main',
  templateUrl: './weather-widget-main.component.html',
  styleUrls: ['./weather-widget-main.component.css']
})
export class WeatherWidgetMainComponent implements OnInit {

  WeatherData: any;
  constructor() { }

  ngOnInit(): void {
    this.WeatherData = {
      main: {},
      isDay: true
    }
    this.getWeatherData();
    console.log(this.WeatherData)
  }

  getWeatherData() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Dallas&appid=42a38a5b2927ddab6f9c12d56b625934')
    .then(Response=>Response.json())
    .then(data=>{this.setWeatherData(data);})
    //let data = JSON.parse('{"coord":{"lon":-96.7836,"lat":32.7668},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02n"}],"base":"stations","main":{"temp":300.78,"feels_like":302.78,"temp_min":299.16,"temp_max":302.31,"pressure":1017,"humidity":67},"visibility":10000,"wind":{"speed":5.66,"deg":150},"clouds":{"all":20},"dt":1652240641,"sys":{"type":2,"id":2036480,"country":"US","sunrise":1652182318,"sunset":1652231710},"timezone":-18000,"id":4684904,"name":"Dallas","cod":200}')
    //this.setWeatherData(data)
  }

  setWeatherData(data: any) {
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleDateString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);

  }

}
