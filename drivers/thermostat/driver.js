'use strict';

const TadoDriver = require('../../lib/TadoDriver');

const capabilitiesMap = {
	'HEATING': [ 'tado_manual', 'measure_temperature', 'target_temperature', 'measure_humidity' ],
	'HOT_WATER': [ 'tado_manual', 'target_temperature' ],
}
const capabilitiesOptionsMap = {
	'HEATING': {
	    "target_temperature": {
		    "min": 5,
		    "max": 25
	    }		
	},
	'HOT_WATER': {
	    "target_temperature": {
		    "min": 30,
		    "max": 65
	    }
	}
}
const mobileComponentsMap = {
	'HEATING': [
	    {
		    "id": "icon"
	    },
	    {
		    "id": "toggle",
		    "capabilities": [ "tado_manual" ],
		    "options": {
			    "showTitle": true
		    }
	    },
	    {
		    "id": "sensor",
		    "capabilities": [ "measure_temperature", "measure_humidity" ]
	    },
	    {
		    "id": "thermostat",
		    "capabilities": [ "target_temperature" ]
	    }
    ],
    'HOT_WATER': [
	    {
		    "id": "icon"
	    },
	    {
		    "id": "toggle",
		    "capabilities": [ "tado_manual" ],
		    "options": {
			    "showTitle": true
		    }
	    },
	    {
		    "id": "thermostat",
		    "capabilities": [ "target_temperature" ]
	    }
	]
}

class TadoDriverThermostat extends TadoDriver {
	
	async _onPairListDevices( result ) {
		let devices = [];
					
		result.forEach( item => {
			let home = item.home;
			item.zones.forEach( zone => {
				let device = {};
					device.name = `${zone.name} (${home.name})`;
					device.data = {
						homeId: home.id,
						zoneId: zone.id,
						type: zone.type
					}
					device.capabilities = capabilitiesMap[ zone.type ];
					device.capabilitiesOptions = capabilitiesOptionsMap[ zone.type ];
					device.mobile = { components: mobileComponentsMap[ zone.type ] };
								
				devices.push(device);
			})						
		})
		
		return devices;
	}
	
}

module.exports = TadoDriverThermostat;