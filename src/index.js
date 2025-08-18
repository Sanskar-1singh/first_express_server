const express=require('express');
const bodyparser=require('body-parser');
//all this is happening on application layer
//when we call the function express we create a new express server object
//here we are using cjs moduling>>

//when we  call this function it will create a http server object>>
const app=express();
const PORT=3000;
app.listen(PORT,()=>{
    console.log(`server stated at port ${PORT}`);
});

app.get('/ping',(req,res)=>{
    console.log("bye bye");
})
//here i mention that bodyparser middleware will apply to all route and will convert json request body to javascript compatible types i.e. string or javascript object and print>>
app.use(bodyparser.json());
app.use(bodyparser.text());
//express middleware

function m1(req,res,next){  // =>next->m2
    console.log("inside middleware m1");
    //return res.json({msg:"ok"});
    console.log("req.user inside m1",req.user); //undefined

    req.user={id:1,email:"s@s.com"};
    next();
    console.log("after calling from m1");
}
//expree middleware all middleware are having access to next middleware and then can call it using next() function>>
function m2(req,res,next){ //=>next->cb
    console.log("inside middleware m2");
    console.log("req.user inside middleware 2",req.user);
    next();
    console.log("after calling from m2");
}

//here all three m1,m2,and cb all are middleware
//and we are registering m1,m2,cb middleware to request which is here get request>>
//express will automatically chain all this middleware according to their sequencing>>
//whenever new rwquest comes up all registered middlware will execute themeselves  in chainig fashion>>
//we have to call next() function then only we can execute other middleware else other middleware will stuck and hence our http request will stuck>>
//but first middleware will always be automatically called no matter what>>


app.get('/home',m1,m2,(req,res)=>{
    //everytime someone calls from /home route,this callback will be called
    console.log("/home called");
       console.log(req.url,req.query);
    return res.json({msg:"ok"});//actually here we are sending pure  js object and express convert it into json by .json  function and send it as response
});

//how can the client send custom data to the server
//->url params  /products/1 this is part of our url route 
//->query params ?key=value&key=value
//->request body

app.get('/products/:product_id/rating/:rate',(req,res)=>{
    // :id part is variable and product is static
    //:id part is your url params and overall these kinds of routes are called as dynamic route
    console.log(req.params);
    console.log(req.body);
    const pid=req.params.product_id;
    return res.json({productId:pid,rating:req.params.rate});

})

app.post('/data',(req,res)=>{
   // console.log(req.body);
    return res.json({msg:'ok'});
})

// as we did not send sensitive data from query params or query url thus for that purpose we use req body becuase it is part of request body thus it did not cached and did not save as 
// history in our browser basically it is more safe>>>

