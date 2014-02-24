
/*
  Portal web transparente.ugr.es para publicar datos de la Universidad de Granada
  Copyright (C) 2014  Jaime Torres Benavente

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
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
                if(item != null) datos.push([item.nombre,item.url,item.metadatos]);
                
                // Si no existen mas item que mostrar, cerramos la conexión con con Mongo y renderizamos la página
                else{
                  db.close();
                  res.render('ugr', { seccion: sec , datos: datos});
                }
        });
  });



};