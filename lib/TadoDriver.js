'use strict';

const Homey = require('homey');
const TadoApi = require('./TadoApi');

class TadoDriver extends Homey.Driver {
	
	onPair( socket ) {
		
		let tadoApi;
		let username;
		let password;
		
		socket.on('login', ( data, callback ) => {
			
			username = data.username;
			password = data.password;
			
			tadoApi = new TadoApi( username, password );
			tadoApi.login().then(() => {
				callback( null, true );
			}).catch( err => {
				callback( err );
			})
		});
		
		socket.on('list_devices', ( data, callback ) => {
			let homeId;
			tadoApi.getMe()
				.then( result => {
					let promises = [];
					
					result.homes.forEach( home => {
						let promise = tadoApi.getZones( home.id )
							.then( result => {
								return {
									home: home,
									zones: result
								}
							});
						promises.push( promise );
					});
					
					return Promise.all( promises );
				})
				.then( result => {
					//console.log('result', JSON.stringify(result, false, 4))
					
					return this._onPairListDevices( result )
				})
				.then( devices => {
					devices = devices.map( device => {						
						device.settings = {
							username: username,
							password: password,
						}
						return device;
					})
					callback( null, devices );
				})
				.catch( err => {
					this.error( err );
					callback( err );
				});
		});
		
	}
	
	async _onPairListDevices( result ) {
		return [];
	}
	
}

module.exports = TadoDriver;