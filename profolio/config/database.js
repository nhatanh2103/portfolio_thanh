const sqlite3=require("sqlite3").verbose();

let db=new sqlite3.Database('instance/database.db', (error=>{
    if (error){
        console.log("Fail to connect: "+error);
    }
    else{
        console.log("Connect to database successfully");
    }
}))

module.exports=db;