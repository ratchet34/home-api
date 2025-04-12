const crypto = require('crypto');

// Get the command line argument
const input = process.argv[2];

if (!input) {
  console.error('Please provide a string to hash as a command line argument.');
  process.exit(1);
}

// Hash the input using SHA1
const hash = crypto.createHash('sha1').update(input).digest('hex');

// Print the hashed value
console.log(`SHA1 Hash: ${hash}`);