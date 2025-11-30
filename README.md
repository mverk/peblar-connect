# Peblar Connect
## The Web-interface for monitoring and controlling Peblar EV Chargers

### Installation
As of now, Peblar Connect is still in development. Because of this we can't provide a detailed installation guide yet. 

### What is Peblar? And what is Peblar Connect?
Peblar is a EV Charger manufacturer based in the Netherlands. As of now, there is no open source UI to control the Peblar Charger. 
So meet Peblar Connect. The open source web UI to control the Peblar Home charger. With features like creating custom schedules with solar panels, real time weather data and more, Peblar Connect allows you to easily control your Peblar Home charger.

---

## API Documentation
By running the backend on a docker container, the Peblar Connect API will be launched. The Peblar Connect API has a few features... It includes routing the Peblar REST API to some custom endpoints, and the entire logic controlling Peblar

### Endpoints
`http://EXAMPLEIP:14500/meter`<br>
The meter endpoint mirrors everything from the Peblar REST API meter endpoint.

<b>Response example</b><br>
🟢 **GET** `/meter`
```json
{
  "CurrentPhase1": 10212,
  "CurrentPhase2": 0,
  "CurrentPhase3": 0,
  "VoltagePhase1": 230,
  "VoltagePhase2": null,
  "VoltagePhase3": null,
  "PowerPhase1": 2348,
  "PowerPhase2": 0,
  "PowerPhase3": 0,
  "PowerTotal": 2348,
  "EnergyTotal": 6734674673,
  "EnergySession": 2673762
}
```
<br>

`http://EXAMPLEIP:14500/evinterface`<br>
The evinterface endpoint mirrors everything from the Peblar REST API evinterface endpoint.

<b>Response example</b><br>
🟢 **GET** `/evinterface`

```json
{
  "CpState": "State C",
  "LockState": true,
  "ChargeCurrentLimit": 14000,
  "ChargeCurrentLimitSource": "Dynamic load balancing",
  "ChargeCurrentLimitActual": 14000,
  "Force1Phase": true
}
```
<br>

`http://EXAMPLEIP:14500/system`<br>
The system endpoint mirrors everything from the Peblar REST API system endpoint.

<b>Response example</b><br>
🟢 **GET** `/system`

```json
{
  "ProductPn": "6002-1234-6573",
  "ProductSn": "23-45-A3B-EA0",
  "FirmwareVersion": "1.6.0+1+WL-1",
  "WLANSignalStrength": -73,
  "CellularSignalStrength": -91,
  "Uptime": 3000001,
  "PhaseCount": 3,
  "Force1PhaseAllowed": true,
  "ActiveErrorCodes": [
    1101,
    1104,
    1203
  ],
  "ActiveWarningCodes": [
    11001
  ]
}
```
<br>

`http://EXAMPLEIP:14500/p1`<br>
The p1 endpoint mirrors everything from the P1 meter endpoint

<b>Response example</b><br>
🟢 **GET** `/p1`

```json
{
  "wifi_ssid": "YOURWIFI",
  "wifi_strength": 100,
  "smr_version": 50,
  "meter_model": "Kaifa AIFA-METER",
  "unique_id": "UNIQUEID",
  "active_tariff": 1,
  "total_power_import_kwh": 21776.787,
  "total_power_import_t1_kwh": 11862.953,
  "total_power_import_t2_kwh": 9913.834,
  "total_power_export_kwh": 5233.639,
  "total_power_export_t1_kwh": 1523.916,
  "total_power_export_t2_kwh": 3709.723,
  "active_power_w": 1639,
  "active_power_l1_w": -30,
  "active_power_l2_w": 991,
  "active_power_l3_w": 679,
  "active_voltage_l1_v": 232.2,
  "active_voltage_l2_v": 229.2,
  "active_voltage_l3_v": 230.3,
  "active_current_a": 7.401,
  "active_current_l1_a": -0.129,
  "active_current_l2_a": 4.324,
  "active_current_l3_a": 2.948,
  "voltage_sag_l1_count": 9,
  "voltage_sag_l2_count": 11,
  "voltage_sag_l3_count": 128,
  "voltage_swell_l1_count": 3365,
  "voltage_swell_l2_count": 4,
  "voltage_swell_l3_count": 11807,
  "any_power_fail_count": 2,
  "long_power_fail_count": 1,
  "external": []
}
```
<br>

`http://EXAMPLEIP:14500/peblarconnect/health`<br>
The peblarconnect/health endpoint returns 'Healthy' if everything is okay, if not it will return an error.

<b>Response example</b><br>
🟢 **GET** `/peblarconnect/health`

```json
{
  "success": true,
  "message": "Healthy"
}
```
<br>

`http://EXAMPLEIP:14500/peblarconnect/modes`<br>
The peblarconnect/modes endpoint is used to change modes and also check the current mode.

<b>Response example</b><br>
🟢 **GET** `/peblarconnect/modes`

```json
{
  "currentMode": "solaronly"
}
```

<b>Request example</b><br>
🟢 **POST** `/peblarconnect/modes`<br>
Headers: `switchmode: solaronly`

```json
{
	"success": true,
	"data": {
		"currentMode": "solaronly"
	}
}
```