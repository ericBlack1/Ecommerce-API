const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'E-commerce Backend API',
            version: '1.0.0',
            description: 'API documentation for the e-commerce backend',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development server',
            },
        ],
    },
    apis: ['./routes/*.js'],
};  

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;