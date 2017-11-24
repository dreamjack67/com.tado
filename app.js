'use strict';

const Homey = require('homey');
const TadoApi = require('./lib/TadoApi');

class TadoApp extends Homey.App {
	
	onInit() {
		
		this.log('TadoApp is running...');
		
		/*
		
		let homeId;
		let zoneId;
		let tadoApi = new TadoApi('test@athom.com', 'homeyhomey');
		tadoApi.login()
			.then(() => {
				console.log('Logged in');
				return tadoApi.getMe();
			})
			.then( result => {
				//console.log(result)
				homeId = result.homes[0].id;
				return tadoApi.getZones( homeId );
			})
			.then( result => {
				//console.log(result)
				zoneId = result[0].id;
				//return tadoApi.getOverlay( homeId, zoneId )
			})
			.then( result => {
				return tadoApi.setOverlay( homeId, zoneId, {
					"setting": {
						"type": "HEATING",
						"power": "ON",
						"temperature": {
							"celsius": 23
						}
					},
					"termination": {
						"type": "MANUAL"
					}
				})
			})
			.then(() => {
				return tadoApi.unsetOverlay( homeId, zoneId );				
			})
			.catch( err => {
				console.error( err );
			})
		*/
	}
	
}

module.exports = TadoApp;