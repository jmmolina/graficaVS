
/*
 * GET home page.
 */
 var http=require('https');
var result='';
exports.index = function(req, res){
   //hacer la invocación del servici BBVA
   
var options = {
  host: 'api.bbva.com',
  port: 443,
  headers:{
        'Authorization': 'TWlFbnRvcm5vQkJWQTpiZGFiMDJhZDc5Zjc3ZTBkNzIyODVmMzAyMTRlODliNzBkYWRkOWYy'
    },
  path: '/apidatos/zones/cards_cube.json?date_min=20130101&date_max=20130301&group_by=month&zipcode=28660&zoom=2'
};

http.get(options, function(res1) {
	res1.on('data', function (chunk) {
		result+=chunk; //va concatenando la respuesta
                             
                           
	});
	res1.on('end', function()
	{  //cuando se tiene toda el cuerpo de la respuesta con el JSON, se invoca la fusión de html + datos
	    res.render('index', JSON.parse(result));
		});



  //console.log("Got response: " + res)	;
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});

  
};