
/*
 * GET home page.
 */

var MongoClient = require('mongodb').MongoClient;


exports.index = function(req, res){
  var sec='Presentación';
  var texto='Texto de presentación'
  res.render('index', { seccion: sec , texto: texto});
};

exports.ugr = function(req, res){
  var sec='UGR';
  datos = new Array();

  //Conexion con MongoDB -> servidor:puerto/nombreBasedeDatos
  MongoClient.connect('mongodb://localhost:27017/transparente', function(err,db){
        if(err) throw err;
 
        var coleccion = db.collection('ugr');
 
        var cursor = coleccion.find()
 
        cursor.each(function(err, item) {
                if(item != null) datos[item.nombre]=[item.nombre,item.url];
                
                // Si no existen mas item que mostrar, cerramos la conexión con con Mongo y renderizamos la página
                else{
                  db.close();
                  res.render('ugr', { seccion: sec , datos: datos});
                }
        });
  });



};