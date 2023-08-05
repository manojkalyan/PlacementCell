const mongoose=require('mongoose')

const companySchema=new mongoose.Schema({
name:
{
    type:String,
    required:true
    
},

role:
{
    type:String,
    required:true
    
},
location:{
    type:String,
    required:true

}
 



},
{
    timestamp:true
}
)




const company=mongoose.model('company',companySchema)

module.exports=company














