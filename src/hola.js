var docs = [];
for (var i = 0 ; i<20 ; i++){
  var doc = {
    nombre: 'sujeto ' + (i + 1),
    edad: Math.ceil(Math.random() * 40),
    tag: ['BsinAlcohol', 'Alcohol2%', 'Alcohol4%', 'Alcohol12%', 'Alcohol20%'][Math.floor(Math.random() * 3)],
    time: Math.floor(Math.random() * 100 * (1000 * 60 * 60 * 24)),
    fecha: new Date().getTime() + Math.floor(Math.random() * 100 * (1000 * 60 * 60 * 24)),
    
  }
  docs.push(doc);
} 
db.Alcoholicos.insertMany(docs);