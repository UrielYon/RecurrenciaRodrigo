tesis-aulas
- node v10.0.0  https://nodejs.org/es/download/
- npm 6.10.2  https://www.npmjs.com/get-npm
- instalar mongodb  https://docs.mongodb.com/manual/installation/
- instalar  cleinte para mongo llamado robo 3T  https://robomongo.org/download  (opcional)
 instalacion Teminal 
paso #1
crear una db llamada "aulas"
ejecutar este codigo 
use aulas
db.createCollection("user")  
db.createCollection("solicitudes")
db.createCollection("auditorios")

paso 2
sustituye con todo y []
db.auditorios.insertMany(coleccionAuditorios)
coleccionAuditorios esta  en el archivo scrip.js

instalcion grafica 
https://docs.google.com/document/d/1Wt2mz4f7u0mNgbQaAlj4BVjeDGHGXxJRHc9wOlWdmdU/edit

- hacer un npm install
- se ejecuta  nodemon bin/www 
    revisar manual de instalacion 
se busca en el explorador http://localhost:3000/


para crear usuarios  
http://localhost:7777/registry 

iniciar session 
http://localhost:7777/login

home profesor
http://localhost:7777/


