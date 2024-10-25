const express = require('express');
const app = express();

app.get('*', (req, res) => {
    // Get IP address of the request origin
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Get domain and port
    const domain = req.hostname;
    const port = req.socket.localPort;

    // Get the full URL with query parameters
    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

    // Log details
    console.log('Request Details:');
    console.log('IP Address:', ip);
    console.log('Domain:', domain);
    console.log('Port:', port);
    console.log('Full URL with Params:', fullUrl);

    // Return response
    res.json({
        message: 'Request received',
        ip: ip,
        domain: domain,
        port: port,
        fullUrl: fullUrl
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
