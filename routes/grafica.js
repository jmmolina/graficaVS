
/*
 * GET users listing.
 */
var http=require('https');
var result='';

exports.grafica = function(req, res){

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
  		var resultado=JSON.parse(result);
		var datos="{cols: [{id: 'A', label: 'A-Label', type: 'string'},{id: 'B', label: 'menor de 18', type: 'number'},{id: 'C', label: '19-25', type: 'number'},{id: 'D', label: '26-35', type: 'number'},{id: 'E', label: '36-45', type: 'number'},{id: 'F', label: '46-55', type: 'number'},{id: 'G', label: '56-65', type: 'number'},{id: 'H', label: 'mayor de 66', type: 'number'}],rows: [";
		
		for(var i=0; i< resultado.data.size; i++)
		{
			datos+="{c:[ {v: '"+resultado.data.stats[i].date+"'},"
			for (var j=0; j<resultado.data.stats[i].cube.length; j++)
			{
				if(resultado.data.stats[i].cube[j].hash.substr(0,1)=="F")
				{
					datos+="{v: "+resultado.data.stats[i].cube[j].avg+"}";
					if(!((resultado.data.stats[i].cube.length-j)==1))
					{
					    datos+=",";	
					}
				}
			}
			datos+="]}";
			if(!((resultado.data.size-i)==1))
				
			{
				datos+=",";	
			}
		}
		datos+="]}";
/* json para probar la grafica
var contenido="{cols: [{id: 'A', label: 'A-Label', type: 'string'},{id: 'B', label: 'Hombres', type: 'number'},{id: 'C', label: 'Mujeres', type: 'number'}],rows: [{c:[ {v: '201315'}, {v: 30.0},  {v: 40.0}]}]}";
*/
   		var grafica={'objeto':datos};
 		
   		res.render("grafica", grafica);
		});
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});

  
};

