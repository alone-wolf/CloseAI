const os = require('os');
const interfaces = os.networkInterfaces();

let ipAddress = [];
Object.keys(interfaces).forEach((interfaceName) => {
    interfaces[interfaceName].forEach((interface) => {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        // if (interface.family !== 'IPv4' || interface.internal !== false) {
        if (interface.family !== 'IPv4') {
            return;
        }
        ipAddress.push(interface.address);
    });
});

module.exports = ipAddress;
