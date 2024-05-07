const express = require('express');
 const app = express();
 const authRoutes = require('./routes/auth');
 require("./db/connection")
 const protectedRoute = require('./routes/protectedRoute');
 const movieRoutes = require('./routes/movieRoutes');
 app.use(express.json());

 app.use('/auth', authRoutes);
 app.use('/protected', protectedRoute);
 app.use('/movies', movieRoutes);

 const PORT = process.env.PORT || 3000;
 app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
 });