# tado°
Adds support for tado° thermostats.

## If you installed this app before v1.1.0 (that is: v1.0.0 or v1.0.1), then you need to remove the already added devices and add them again to enable the new functionality!

# Currently supported:
* tado° Smart Thermostat (Heating & Hot water).
* tado° Smart Radiator Thermostat.
* Combination of Smart Thermostat and Smart Radiator Thermostat.


# Configuration
* Go to "Zones & Devices" and add tado° devices.
* Enter the same details that you use to access https://my.tado.com.
* Select the devices and add them to Homey.
* You can add multiple Homes by repeating device addition and entering different log-in details.

## How does it work
The app communicates with the online API at my.tado.com and does not directly contact your tado° devices. All data is sent over a secure https connection.

Various capabilities are available:
* Device icon: Tap to disable manual mode and set a zone to Smart schedule.
* Thermostat dial. _Only 0.5 degree steps for now, but we're working on the 0.1 degree resolution that tado° offers for their Smart Thermostats_.
* Sensor display:
  * Temperature. _not for hot water_.
  * Humidity. _not for hot water_.
  * Heating capacity (%). _not for hot water_.
  * Open Window detection. _not for hot water_.
  * Smart schedule activity.
  * Someone at home?
  * Temperature outside. _Offered by tado, from external provider_.
  * Solar intensity. _Offered by tado, from external provider_.
  * Weather conditions. _Offered by tado, from external provider_.


### Flow Triggers:
  * The target temperature setting has changed. (temperature token)
  * The temperature measurement has changed (temperature token)
  * The humidity measurement has changed (percentage token)
  * The heating capacity has changed (percentage token)
  * Open Window Detection has changed (detection token: true or false)
  * Smart schedule has changed (active token: true or false)
  * Outside temperature has changed (temperature token)
  * Solar intensity has changed (intensity (%) token)
  * The Weather changes (conditions token: [Sunny, Foggy, Thunderstorms etc.], id token: internally used id for comparisons etc.)


### Flow Conditions:
  * Smart schedule is/is not active.
  * Open window detection is/is not active.
  * Someone is at home / Everyone is out.
  * Weather condition is/is not... [Select from currently known possibilities]


### Flow Actions:
  * Set the target temperature (Enables manual mode. 0.5 degree steps for now. We're working on a 0.1 degree resolution)
  * Activate Smart schedule
  * Turn heating off


# History

### 1.1.0
  * Upgrade bij Alex van den Berg (OpenMind_NL).
  * New: various mobile display items.
  * Removed _Manual control_ switch.
    * Manual mode is enabled when the thermostat is operated.
    * Tap the device icon to enable Smart schedule.
  * New: various flow cards.
  * Small changes.
  * Updated capability icons and app-store images.

### 1.0.0 (November 2017)
  * Initial release by Athom.
  * Basic functionality.
