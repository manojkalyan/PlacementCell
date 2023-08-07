const mongoose=require('mongoose')

const employeeSchema=new mongoose.Schema({
email:
{
    type:String,
    required:true,
    unique:true
},
password:
{
    type:String,
    required:true
    
},
name:
{
    type:String,
    required:true
    
},
 



},
{
    timestamp:true
}
)

const employee=mongoose.model('employee',employeeSchema)

module.exports=employee














