'use strict';

const TadoDevice = require('../../lib/TadoDevice');

class TadoDeviceThermostat extends TadoDevice {
	
	onInit() {
		super.onInit();
		
		this.registerCapabilityListener('target_temperature', this._onCapabilityTargetTemperature.bind(this))
		this.registerCapabilityListener('tado_manual', this._onCapabilityTadoManual.bind(this))
		
	}
	
	_onState( state ) {
		
		//console.log(state)
		
		if( this.hasCapability('measure_temperature') && state.sensorDataPoints.insideTemperature )
			this.setCapabilityValue('measure_temperature', state.sensorDataPoints.insideTemperature.celsius ).catch( this.error );
		
		if( this.hasCapability('measure_humidity') && state.sensorDataPoints.humidity )
			this.setCapabilityValue('measure_humidity', state.sensorDataPoints.humidity.percentage ).catch( this.error );
		
		if( this.hasCapability('target_temperature') && state.setting.temperature )
			this.setCapabilityValue('target_temperature', state.setting.temperature.celsius ).catch( this.error );
			
		if( this.hasCapability('tado_manual') )
			this.setCapabilityValue('tado_manual', state.overlayType === 'MANUAL' ).catch( this.error );
	}
	
	async _onCapabilityTargetTemperature( value ) {
		return this._api.setOverlay( this._homeId, this._zoneId, {
			"setting": {
				"type": this._type,
				"power": "ON",
				"temperature": {
					"celsius": value
				}
			},
			"termination": {
				"type": "MANUAL"
			}
		}).then(() => {
			return this.getState();
		})
	}
	
	async _onCapabilityTadoManual( value ) {
		if( value ) {
			return this._onCapabilityTargetTemperature( this.getCapabilityValue('target_temperature') );
		} else {
			return this._api.unsetOverlay( this._homeId, this._zoneId );
		}
	}
	
}

module.exports = TadoDeviceThermostat;