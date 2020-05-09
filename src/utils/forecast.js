const request=require('postman-request')
const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=6f39bf02823c4b5599ef8031ac08565c&query='+latitude+','+longitude+'units=f'
    
        request({ url, json: true }, (error, {body}) => {
            if (error) {
                callback('Unable to connect to weather service!', undefined)
            } else if (body.error) {
                callback('Unable to find location', undefined)
            } else {
                callback(undefined,body.current.weather_descriptions[0]+' there is currently '+body.current.temperature+' degree out there.'+'there is a '+body.current.precip+' % chances of rain')
            }
        })
    }
    
    module.exports = forecast