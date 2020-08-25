import express from 'express';

import routes from './routes';

const app = express();

app.get('/', (request, response) => {
    return response.json({ message: 'Hello World.' });
});

app.listen(3333, () => {
    console.log('🚀🚀🚀🚀');
    console.log('Server Started');
    console.log('🚀🚀🚀🚀');
});
