// import { useState } from 'react';
import { useParams } from 'react-router-dom';
import weatherData from '../assets/dummy_data/weather.json';
interface weatherInfoObject {
    cod: string;
    message: number;
    cnt: number;
    list: any[];
}

interface userSideWeatherInfo {
    weather: string;
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    windspeed: number;
    date_text: string;
    date_val: number;
}
interface weatherDataFormat {
    dt: number;
    main: mainSubObjectInterface;
    weather: Array<weatherSubArrayInterface>;
    clouds: object;
    wind: windSubObjectInterface;
    visibility: number;
    pop: number;
    sys: object;
    dt_txt: string;
}
interface weatherSubArrayInterface {
    id: number;
    main: string;
    description: string;
    icon: string;
}
interface mainSubObjectInterface {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
}
interface windSubObjectInterface {
    speed: number;
    deg: number;
    gust: number;
}

const WeatherDisplayMain = () => {
    const { lat, long } = useParams<{ lat: string; long: string }>();
    // console.log('weather data ', weatherData);

    function weatherTranslate(weatherInfo: any) {
        // translate unix time to utc/javascript,
        // forEach to search for the noon timestamps and put those in an array;
        // read array after to see length, and if not enough for all 5 days,
        // look at weatherinfo.length-1 and use that for last slot
        // F = 1.8*(K-273) + 32.
        //
   

        // const desiredKey = "list";
        // const listval : {[key:string]:string} = Object.entries(weatherInfo).find(([key, val]) => key === desiredKey)?.[1];;
        // console.log(weatherInfo.list[0].main);
        const weatherInfoArrayToday: Array<userSideWeatherInfo> = [];
        const weatherInfoArrayWeek: Array<userSideWeatherInfo> = [];

        function returnInfo(weatherInfo: weatherInfoObject) {
            // console.log(weatherInfo);
            // let userInfoReturn :userSideWeatherInfo;

            // let returnObject:weatherInfoObject;

            const arrayOfDates: Array<number> = [];
            function returnCurrentTime(timeNow: number, info: weatherInfoObject) {
                let smallestDifference: number = 999999999999;
                let closestTime: string = 'none';
                let closestGoingToArray: weatherDataFormat = info.list[0];
                info.list.forEach(listObject => {
                    if (
                        Math.min(Math.abs(timeNow - listObject.dt * 1000)) <=
                        smallestDifference
                    ) {
                        smallestDifference = Math.min(
                            Math.abs(timeNow - listObject.dt * 1000)
                        );
                        closestTime = listObject.dt_txt + ' Universal Time Coordinated';
                        closestGoingToArray = listObject;
                    }
                });
                const currentWeather: userSideWeatherInfo = {
                    weather: closestGoingToArray.weather[0].main,
                    temp: closestGoingToArray.main.temp,
                    temp_min: closestGoingToArray.main.temp_min,
                    temp_max: closestGoingToArray.main.temp_max,
                    humidity: closestGoingToArray.main.humidity,
                    windspeed: closestGoingToArray.wind.speed,
                    date_text: closestGoingToArray.dt_txt,
                    date_val: closestGoingToArray.dt,
                };

                weatherInfoArrayToday.push(currentWeather);
                return;
            }
            function getDaysAfter(currentTime: number, info: weatherInfoObject) {
                const daysAfter: Array<weatherDataFormat> = [];
                info.list.forEach(listObject => {
                    if ((listObject.dt * 1000 >= currentTime) && (((listObject.dt + 43200) % 86400) === 0)) {
                        daysAfter.push(listObject);
                    }
                });
                // console.log(daysAfter)
                return daysAfter;
                //add in condition that listObject.dt*1000 has to be greater than date.now
            }

            let hourCount = 0;
            weatherInfo.list.forEach(listItem => {
                if (hourCount % 8 === 0) {
                    arrayOfDates.push(listItem.dt);
                }
                hourCount++;
            });
            returnCurrentTime(Date.now(), weatherInfo)
            // returnObject.list[0]. = "hey";
            // console.log(weatherInfoArrayToday);
            // console.log(getDaysAfter(Date.now(), weatherInfo)); // returns only objects at times equal to noon
            // console.log(returnCurrentTime(Date.now(), weatherInfo)); // returns only objects at times equal to noon
        
            let weatherPasser: userSideWeatherInfo = { temp: 0, temp_max: 0, temp_min: 0, humidity: 0, windspeed: 0, weather: "", date_text: "", date_val: 0 };

            function weatherRestOfTheDay(currentTimestamp:number, info:weatherInfoObject){
                let happenedYet:Boolean=true;
                const nowTillTomorrow: Array<weatherDataFormat> = [];

                info.list[0].forEach((weatherObject:weatherDataFormat)=>
                {
                    if(currentTimestamp <= weatherObject.dt){
                        happenedYet = false;
                    }
                    if((happenedYet===false)&& (((weatherObject.dt+43200)%86400)!=0))
                    {
                        nowTillTomorrow.push(weatherObject);
                    }

                })

                nowTillTomorrow.forEach((times)=> 
                {
                    weatherPasser.temp = times.main.temp;
                    weatherPasser.temp_min = times.main.temp_min;
                    weatherPasser.temp_max = times.main.temp_max;
                    weatherPasser.humidity = times.main.humidity;
                    weatherPasser.windspeed = times.wind.speed;
                    weatherPasser.date_text = times.dt_txt;
                    weatherPasser.date_val = times.dt;
                    weatherPasser.weather = times.weather[0].main;
                    weatherInfoArrayToday.push(JSON.parse(JSON.stringify(weatherPasser)));
                })

            }
            

            if (getDaysAfter(Date.now(), weatherInfo).length <= 4) {
                weatherInfoArrayWeek.push(weatherInfoArrayToday[0])
            }

            getDaysAfter(Date.now(), weatherInfo).forEach((upcomingDay) => {
                weatherPasser.temp = upcomingDay.main.temp;
                weatherPasser.temp_min = upcomingDay.main.temp_min;
                weatherPasser.temp_max = upcomingDay.main.temp_max;
                weatherPasser.humidity = upcomingDay.main.humidity;
                weatherPasser.windspeed = upcomingDay.wind.speed;
                weatherPasser.date_text = upcomingDay.dt_txt;
                weatherPasser.date_val = upcomingDay.dt;
                weatherPasser.weather = upcomingDay.weather[0].main;
                weatherInfoArrayWeek.push(JSON.parse(JSON.stringify(weatherPasser)));
            })
            let finalVals:Array<Array<userSideWeatherInfo>>=[weatherInfoArrayToday, weatherInfoArrayWeek]

            // return getDaysAfter(Date.now(), weatherInfo);
            return finalVals;
        }
        return returnInfo(weatherInfo);
    }
    console.log(    JSON.stringify(weatherTranslate(weatherData)[0].length))
    let stringVersion:string="";
    weatherTranslate(weatherData)[0].forEach((remainingTime)=>{
        console.log(remainingTime)

        stringVersion=stringVersion.concat(remainingTime.weather.toString(),`\n`)
    });
    console.log(stringVersion)

    // console.log(weatherTranslate(weatherData));
    return (
        <div>
            <div>
                <h1>Your Weather Display
                    <br />
                    Updated as of {(weatherTranslate(weatherData)[0][0].date_text).toString()}, UTC.
                </h1>

                <div>
                    {lat} is your current latitude and {long} is your current longitude.
                </div>
                <div>Your current weather is: {(weatherTranslate(weatherData)[0][0].weather).toString()}</div>
                <div>
                    Your current temperature is {(weatherTranslate(weatherData)[0][0].temp).toString()} degrees Farenheit.
                </div>
                <div>
                    The highs and lows for right now are {(weatherTranslate(weatherData)[0][0].temp_max).toString()} and {(weatherTranslate(weatherData)[0][0].temp_min).toString()} degrees Farenheit.
                </div>
                <div>
                    The humidity is {(weatherTranslate(weatherData)[0][0].humidity).toString()} percent.
                </div>
                <div>
                    The windspeed is {(weatherTranslate(weatherData)[0][0].windspeed).toString()} MPH.
                </div>
            </div>
            <div>
                <br />
                <div>
                    Your weather for the rest of the day:
                </div>
                <br />
                {stringVersion}
                <br />

            </div>
            <div>
                <br />
                <div>
                    Your 5-ish day forecast:
                </div>
                <br />
                Now: {(weatherTranslate(weatherData)[1][0].weather)}
                <br />
                {(weatherTranslate(weatherData)[1][1].date_text)}: {(weatherTranslate(weatherData)[1][1].weather)}
                <br />
                {(weatherTranslate(weatherData)[1][2].date_text)}: {(weatherTranslate(weatherData)[1][2].weather)}
                <br />
                {(weatherTranslate(weatherData)[1][3].date_text)}: {(weatherTranslate(weatherData)[1][3].weather)}
                <br />
                {(weatherTranslate(weatherData)[1][4].date_text)}: {(weatherTranslate(weatherData)[1][4].weather)}
                <br />
            </div>
        </div>
    )
   ;
};

export default WeatherDisplayMain;
