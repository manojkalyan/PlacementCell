const mongoose=require('mongoose')

const interviewSchema=new mongoose.Schema({
date:
{
    type:String,
    required:true
    
},

starttime:
{
    type:String,
    required:true
    
},
students:
{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Student'
    
},
companies:
{
    type:mongoose.Schema.Types.ObjectId,
    ref:'company'
    
},
 result: {
    type: String,
    enum: ['pass', 'fail', 'Didn’t Attempt', 'on-hold'],
    default: 'Didn’t Attempt'
  },

 

 



},
{
    timestamp:true
}
)




const interview=mongoose.model('interview',interviewSchema)

module.exports=interview














