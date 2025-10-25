    import dotenv from 'dotenv';
    dotenv.config();

    const dbConfig = {
    url: process.env.DATABASE_URL 
    };

    export default dbConfig;
