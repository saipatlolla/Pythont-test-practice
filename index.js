const app=require('express')()
app.get('/get-data',(req,res)=>{
    res.status(200).send({"data":"hello world"})
    
});
app.get('/get-data2',(req,res)=>{
    res.status(200).send({"data":"hello world1"})
})
app.get('/get-data1',(req,res)=>{
    res.status(200).send({"data":"hello world1"})
})
app.listen(3000,()=>{
    console.log("server running on port 3000")
})
