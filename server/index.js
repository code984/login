// const functions = require('firebase-functions');
// const express = require('express');
// const admin = require('firebase-admin');
// const { Pool } = require('pg');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Initialize Firebase Admin SDK
// admin.initializeApp();

// // Create a PostgreSQL connection pool
// const pool = new Pool({
//   user: 'postgres',
//   password: '000000',
//   database: 'formsystem',
//   host: 'your-postgres-host', // Replace with your PostgreSQL host
//   port: 5432,
// });

// // Endpoint for user registration
// app.post('/signup', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     // Insert the new user into the database
//     const query = 'INSERT INTO signup_table (name, email, password) VALUES ($1, $2, $3)';
//     await pool.query(query, [name, email, password]);
//     res.status(201).send('User registered successfully!');
//   } catch (error) {
//     console.error('Error during registration:', error);
//     res.status(500).send('An error occurred during registration.');
//   }
// });

// // Login
// app.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     // Query the database to check if the user exists
//     const query = 'SELECT * FROM signup_table WHERE email = $1 AND password = $2';
//     const { rows } = await pool.query(query, [email, password]);
//     if (rows.length > 0) {
//       res.status(200).send('Login successful!');
//     } else {
//       res.status(401).send('Invalid email or password');
//     }
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).send('An error occurred during login.');
//   }
// });

// // Retrieve all users
// app.get('/users', async (req, res) => {
//   try {
//     const query = 'SELECT * FROM signup_table';
//     const { rows } = await pool.query(query);
//     res.json(rows);
//   } catch (error) {
//     console.error('Error during user fetch:', error);
//     res.sendStatus(500);
//   }
// });

// // Update user
// app.put('/users/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, email, password } = req.body;

//     // Perform database update operation
//     const query = 'UPDATE signup_table SET name = $1, email = $2, password = $3 WHERE id = $4';
//     const values = [name, email, password, id];

//     await pool.query(query, values);

//     console.log('User updated successfully');
//     res.status(200).json({ message: 'User updated successfully' });
//   } catch (error) {
//     console.error('Error during update:', error);
//     res.status(500).json({ error: 'Failed to update user' });
//   }
// });

// // Retrieve user by ID
// app.get('/users/:id', async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Retrieve the user details from the database
//     const query = 'SELECT * FROM signup_table WHERE id = $1';
//     const values = [id];
//     const result = await pool.query(query, values);

//     // Check if user found
//     if (result.rows.length > 0) {
//       const user = result.rows[0];
//       res.json(user); // Send the user details as JSON response
//     } else {
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (error) {
//     console.error('Error fetching user details:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Delete user
// app.delete('/users/:id', async (req, res) => {
//   try {
//     const { id } = req.params;

//     const query = 'DELETE FROM signup_table WHERE id = $1';
//     await pool.query(query, [id]);

//     res.sendStatus(200);
//   } catch (error) {
//     console.error('Error during user deletion:', error);
//     res.sendStatus(500);
//   }
// });

// // Expose the Express app as a Firebase Functions endpoint
// exports.api = functions.https.onRequest(app);

// ===============================================MainvMainvvMainMainvvvvvMainMainMainMainMainMainMainMainMain=========================================================
const express = require('express');
const app = express();
const { Pool } = require('pg');
const cors = require('cors');




app.use(cors());
app.use(express.json());

// Create a PostgreSQL connection pool
const pool = new Pool({
            user: 'postgres',
            password: '000000',
            database:'formsystem',
            hostname: 'localhost',
            port: 5432,
            
    })
    
// Endpoint for user registration
app.post('/signup', async (req, res) => {
  try {
    const { name, email,password } = req.body;
    // Insert the new user into the database
    const query = 'INSERT INTO signup_table (name,email,password) VALUES ($1, $2,$3)';
    await pool.query(query, [name,email, password]);
    res.status(201).send('User registered successfully!');
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('An error occurred during registration.');
  }
});


// Login=========================form
app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      // Query the database to check if the user exists
      const query = 'SELECT * FROM signup_table WHERE email = $1 AND password = $2';
      const { rows } = await pool.query(query, [email, password]);
      if (rows.length > 0) {
        res.status(200).send('Login successful!');
      } else {
        res.status(401).send('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).send('An error occurred during login.');
    }
  });


  app.get('/home', async (req, res) => {
    try {
      const query = 'SELECT * FROM signup_table';
      const { rows } = await pool.query(query);
      res.json(rows);
    } catch (error) {
      console.error('Error during user fetch:', error);
      res.sendStatus(500);
    }
  });


  


   // Update user=======================update//


    app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const { name, email, password } = req.body;
  
    // Perform database update operation
    const query = 'UPDATE signup_table SET name = $1, email = $2, password = $3 WHERE id = $4';
    const values = [name, email, password, id];
  
    pool.query(query, values, (err, result) => {
      if (err) {
        console.error('Error during update:', err);
        res.status(500).json({ error: 'Failed to update user' });
      } else {
        console.log('User updated successfully');
        res.status(200).json({ message: 'User updated successfully' });
      }
    });
  });
  





//=======================view==================================//
app.get('/view/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Retrieve the user details from the database
    const query = 'SELECT * FROM signup_table WHERE id = $1';
    const values = [id];
    const result = await pool.query(query, values);

    // Check if user found
    if (result.rows.length > 0) {
      const user = result.rows[0];
      res.json(user); // Send the user details as JSON response
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


      
  // Delete user
  app.delete('/delete/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const query = 'DELETE FROM signup_table WHERE id = $1';
      await pool.query(query, [id]);
  
      res.sendStatus(200);
    } catch (error) {
      console.error('Error during user deletion:', error);
      res.sendStatus(500);
    }
  });
  


// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

// =================================================================================================================================================================================


// const express = require("express");
// const pg = require("pg");
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());



// const db = new pg.Pool({
//         user: 'postgres',
//         password: '000000',
//         database:'formsystem',
//         hostname: 'localhost',
//         port: 5432,
        
//     })

   
// console.log("connection success",db);
// // =================report=================
// app.get('/home',(req,res)=>{
//     const sql ="SELECT * FROM signup_table";
//     db.query(sql, (err, result)=>{
//         if(err) return res.json({Message: "Error inside server"});
//         return res.json(result);
//     })
// })

// // ======================SignUp=========================

// app.post('/signup',(req,res)=>{
//   const values =[
//         req.body.name,
//         req.body.email,
//         req.body.password
//     ]
//     console.log("aa gayaaaaaaaa data   --------------", req,"======",values)
//     // db.query(sql,(err,data)=>{
//     //     if(err){
//     //         return res.json("Error");
//     //     }
//     //     return res.json(data);
//     // })
//     const {id, name, email, password}=req.body;
//     db.query('INSERT INTO signup_table (id,name, email,password) VALUES ($1, $2,$3,$4) RETURNING *', [id,name, email,password], (error, results) => {
//         if (error) {
//           throw error
//         }
      
//       })

// })

// // =================Login=========================

// app.post('/login',(req,res)=>{
//     const sql ="SELECT * FROM signup_table WHERE `email` = ? AND `password` = ?";
//     console.log("sql=-=====================",sql)
//     db.query( `SELECT * FROM signup_table WHERE "email" = ? AND "password "= ?`, [req.body.email,req.body.password],(err,data)=>{
//         if(err){
//             return res.json("Error");
//         }
//         if(data.length > 0) {
//             return res.json("Success");
//         }
//         else{
//             return res.json("Fail");
//         }
//     })
// })

// // ===================View====================

// app.get('/view/:id',(req,res)=>{
//     const sql ="SELECT * FROM signup_table WHERE id =?";
//     const id = req.params.id;
//     db.query(sql,[id], (err, result)=>{
//         if(err) return res.json({Message: "Error inside server"});
//         return res.json(result);
//     })
// })

// // =================Update=======================

// app.put('/update/:id',(req,res)=>{
//     const sql='UPDATE signup_table SET `name`=?,`email`=?,`password`=? WHERE id=?';
//     const id=req.params.id;
//     db.query(sql,[req.body.name, req.body.email, req.body.password, id],(err,result)=>{
//         if(err) return res.json({Message: "Error inside server"});
//         return res.json(result);
//     })
// })


// // ====================Delete============================

// app.delete('/delete/:id',(req,res)=>{
//     const sql = "DELETE FROM signup_table WHERE id=?";
//     const id=req.params.id;
//     db.query(sql,[id],(err,result)=>{
//         if(err) return res.json({Message: "Error inside server"});
//         return res.json(result);
//     })
// })

// app.listen(5000,()=>{
//     console.log("localhost 5000");
// })



// // const express = require('express');
// // const bodyParser = require('body-parser');
// // let morgan =require('morgan');
// // const pg = require('pg');

// // const PORT=5000;

// // let app =express();

// // const pool = new pg.Pool({
// //         user: 'postgres',
// //         password: '000000',
// //         database:'form_system',
// //         hostname: 'localhost',
// //         port: 5432,
        
// //     })

// // pool.connect((err,db,done)=>{
// //   if(err){
// //     console.log(err);

// //   }
// //   else{
// //     console.log("loading...................................")
// //     var name='serj';
// //     var email='seraj@gmail';
// //     var password='seraj@123';
// //     var id=Math.random().toFixed(4);
// //     var inQ=`INSERT INTO accounts( id, name, email, password) VALUES (108, 'name12','email12@gmail.com','password1')`;
// //     db.query(inQ,(err,table)=>{ done();
// //       if(err){
// //         return console.log(err)
// //       }
// //       else{
// //         console.log(table.rows);
// //         db.end();
// //       }
// //     })
// //   }
// // })



// //db.query('SELECT*from signup_table',(err,table)=>{
//     // 'INSERT INTO signup_table (id,name,email,password) VALUES ($1, $2, $3, $4) returning *',
//     // [id,name,email,password],
    
// //       done();
// //       if(err){
// //         return console.log(err)
// //       }
// //       else{
// //         console.log(table.rows);
// //         db.end();
// //       }
// //     })
// //   }
// // })


// // app.use(morgan('dev'));
// // app.use(bodyParser.json());
// // app.use(bodyParser.urlencoded({extended:true}))



// // app.use(morgan('dev'));

// // app.use(function(Requeste,Response,next){
// //   Response.header("Access-Controll-Allow-Origin","*");
// //   Response.header("Access-Control-Allow-Header","Orgin,X-Requested-With,Content-type,Accept");
// //   next();
// // });

// // app.listen(PORT,()=>console.log('Listening on port'+PORT))



// // db.query('SELECT*from signup_table',(err,table)=>{
// //     // 'INSERT INTO signup_table (id,name,email,password) VALUES ($1, $2, $3, $4) returning *',
// //     // [id,name,email,password],
    
// //       done();
// //       if(err){
// //         return console.log(err)
// //       }
// //       else{
// //         console.log(table.rows);
// //         db.end();
// //       }
// //     })
// //   }
// // })