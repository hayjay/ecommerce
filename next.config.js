
require('dotenv').config()

module.exports = {
    env: {
        api: process.env.REACT_APP_API,
        PUBLIC_URL: process.env.REACT_APP_PUBLIC_URL
    }
}