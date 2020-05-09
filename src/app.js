const path=require('path')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const express=require('express')
const hbs=require('hbs')
const app=express()
const port=process.env.PORT ||3000
const pathhtml=path.join(__dirname,'../public')
const pathview=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')
app.set('view engine','hbs')
app.set('views',pathview)
hbs.registerPartials(partialspath)
app.use(express.static(pathhtml))
app.get('',(req,res)=>{
    res.render('index',{
        title:'WEATHER',
        name:'harshit lahoty'
       
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        about:'u know me',
        title:'about me',
        name:'Harshit'
      
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        help:'we are heree to help you',
        title:'help',
        name:'harshit'
    })

})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'no search provided'
        })
    }
    console.log(req.query.search);
    
    
    res.send({
        products:[]
    })
})
  

      
 
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'no address'
        })
    }
    
        geocode(req.query.address, (error,{latitude,longitude,location}={}) => {
            if (error) {
               return res.send({
                   error
               })
            }
    
            forecast(latitude,longitude, (error, forecastData) => {
                if (error) {
                  return res.send({error})
                }
                res.send({
                    forcast:forecastData,
                    location,
                    address:req.query.address
                })
    
                
            })
        })
    
    
    })
    
        
       

    app.get('/help/*', (req, res) => {
        res.render('404', {
            title: '404',
            name: 'HARSHIT LAHOTY',
            errormessage: 'Help article not found.'
        })
    })
    
    app.get('*', (req, res) => {
        res.render('404', {
            title: '404',
            name: 'HARSHIT LAHOTY',
            errormessage: 'Page not found.'
        })
    })
        
app.listen(port,()=>{
    console.log('server is up at '+port);
    
})