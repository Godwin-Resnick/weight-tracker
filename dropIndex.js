// const mongoose = require('mongoose');


// // Connect to MongoDB
// mongoose.connect("mongodb+srv://admin:admin@godwincluster.erskvk1.mongodb.net/?retryWrites=true&w=majority&appName=Godwincluster", { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log('MongoDB Connected...');
        
//         // Drop the index 'username_1' from the 'users' collection
//         mongoose.connection.db.collection('users').dropIndex('username_1', (err, result) => {
//             if (err) {
//                 console.error('Error dropping index:', err);
//             } else {
//                 console.log('Index dropped:', result);
//             }

//             // Close the database connection
//             mongoose.connection.close();
//         });
//     })
//     .catch(err => {
//         console.error('MongoDB connection error:', err);
//     });
