/**
    SAMPLE Environment variables

    export PORT="8080"
    export FOLDER="/home/computer/Desktop/storage/"
    export PROVIDER="local"
    export CONFIG="/home/computer/Desktop/personal-drive/config/provider.config.js"
 */


const process = require('process')
const path = require('path')
const fs = require('fs')


const PORT = !!process.env.PORT ? process.env.PORT : '8081';
const FOLDER = process.env.FOLDER
const PROVIDER = process.env.PROVIDER ? process.env.PROVIDER : 'local'
const PROVIDER_CONFIG = process.env.CONFIG


/** Validate PROVIDER START */
    if (PROVIDER === 'google' || PROVIDER === 'local') {                     // PROVIDER should only be 'google' or 'local
        console.log("PROVIDER: ", PROVIDER)
    } else {
        console.log("Invalid PROVIDER: ", PROVIDER)
        process.exit()
    }
/** Validate PROVIDER END */


/** Validate FOLDER START */
    if (!FOLDER) {                                                          // Check if FOLDER environment variable exist
        console.log("Please configure FOLDER environment variable")
        process.exit()
    } else if (FOLDER !== path.basename(FOLDER)) {                           // check if FOLDER path is valid
        fs.stat(FOLDER, (err) => {
            if (err){
                console.log("Invalid FOLDER path: ", FOLDER)
                process.exit()
            }
        });
    }
    console.l
    console.log("FOLDER location: ", FOLDER)
/** Validate FOLDER END */


/** Validate PROVIDER_CONFIG START */
    if (!PROVIDER_CONFIG) {
        console.log("Invalid CONFIG path location: ", PROVIDER_CONFIG)
        process.exit()
    } else if (PROVIDER_CONFIG) {
        fs.stat(PROVIDER_CONFIG, (err) => {
            if (err) {
                console.log("Invalid CONFIG path location: ", PROVIDER_CONFIG)
                process.exit()
            }
        })
    }
    console.log("CONFIG path location: ", PROVIDER_CONFIG)
/** Validate PROVIDER_CONFIG END */


module.exports = { PORT, FOLDER, PROVIDER }