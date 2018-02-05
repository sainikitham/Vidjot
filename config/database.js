if(process.env.NODE_ENV === 'production'){
   module.exports = {mongoURI:'mongodb://nikitha:1234@ds225308.mlab.com:25308/vidjot-prod'}
}else{
    module.exports = {mongoURI:'mongodb://localhost/vidjot-dev'}
}