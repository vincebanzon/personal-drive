const cron = require("node-cron");
const fs = require('fs');
const { ENV_CONFIG } = require('./../config')

/** CHANGE ME */
// Every midnight
const cronjob = "0 0 * * *"              //I believe you know the values to use in cron. :-)

/** CHANGE ME */
// Configure here the period of inactivity of files that needs to be removed base on last access of the file
// Example: daysAgo = 1 will delete files more than 1 day ago (24 hours)
const secondsAgo = 0
const minutesAgo = 0
const hoursAgo = 0
const daysAgo = 0
const monthsAgo = 0
const yearsAgo = 0

function cleanOldFile()  {

	try {
		const files = fs.readdirSync(ENV_CONFIG.FOLDER);							// get all file in FOLDER

		files.forEach( file => {													// for each file
			let filePath = ENV_CONFIG.FOLDER+file

			fs.stat(filePath,  (err, stats) => {									// get file properties
				if (err) {
					console.log(err) 
					return
				} else {
					// create new date
					expiryDate = new Date()

					// subtract respective time fromt timestamp
					expiryDate.setSeconds(expiryDate.getSeconds() - secondsAgo)
					expiryDate.setMinutes(expiryDate.getMinutes() - minutesAgo)
					expiryDate.setHours(expiryDate.getHours() - hoursAgo)
					expiryDate.setDate(expiryDate.getDate() - daysAgo)
					expiryDate.setMonth(expiryDate.getMonth() - monthsAgo)
					expiryDate.setFullYear(expiryDate.getFullYear() - yearsAgo)

					if (stats.atime < expiryDate) {									// if file is older than inactivity period
						fs.unlink(filePath, (err) => {								// delete file
							if(err) throw err
							console.log('Deleted file: ', filePath)          		// file successfully deleted
						})
					} else {
						// file has not expired yet
					}
				}
			})
		});
	} catch(err) {
		console.log(err)
	}
}

module.exports = () => {

	// Prevent unexpected deletion of files by setting all values to 0
	if(!secondsAgo && !minutesAgo && !hoursAgo && !daysAgo && !monthsAgo && !yearsAgo) {
		console.warn("\nCRON NOTICE: Please specify value for inactivity period to cleanup uploaded files. Refer to file cron/index.js\n")
		return
	}

	try {
		console.log('CRON: scheduled for cleaning old files')
		cron.schedule(cronjob, function () {
			cleanOldFile()
		})
	} catch (err) {
		console.log('cron did not work', err)
	}
}
