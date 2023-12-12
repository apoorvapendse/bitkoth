export function testApi(req,res){
    console.log("request called");
    res.json({message:"Hello from test"})
}