// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", function(req, res){
  const now_timestamp = Date.now();
  const now_date = new Date(now_timestamp);
  const formatted_date = now_date.toUTCString();

  res.json({
    "unix":now_timestamp,
    "utc":formatted_date
  });
});

app.get("/api/:date", function(req, res){
  let date
  const regex_unix = /^\d{1,16}$/;
  const dateString = req.params.date;

  if (regex_unix.test(dateString)){
    console.log(date)
    date = new Date(parseInt(dateString));
  } else {
    date = new Date(dateString);
  }

  if (isNaN(date.getTime())) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }

})




// app.get("/api/:date", function(req, res){
//   const date = req.params.date
//   const regex_date = /\d{4}-\d{2}-\d{2}/;
//   const regex_unix = /^\d{1,16}$/;

//   if (regex_date.test(date)){
//     try{
//       const new_date = new Date(date);
//       const date_unix = Date.parse(new_date);
//       const date_utc = new_date.toUTCString();
//       res.json({
//         "unix":parseInt(date_unix),
//         "utc":date_utc
//       });
//     }catch(e){
//       res.json({"error":e})
//     }
//   }
//   else if (regex_unix.test(date)){
//     try{
//       const date_unix = date;
//       const now_date = new Date(parseInt(date_unix));
//       const date_utc = now_date.toUTCString();
//       res.json({
//         "unix":parseInt(date_unix),
//         "utc":date_utc
//       });
//     }catch(e){
//       res.json({"error":e})
//     }
//   }else{
//     res.json({"error":"Invalid Date"})
//   }
// })


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
