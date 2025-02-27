'use strict';

var child_process = require('child_process');
var stream = require('stream');
var SerialPort = require('serialport');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var SerialPort__default = /*#__PURE__*/_interopDefaultLegacy(SerialPort);

class VEDirectData {
  constructor(VEDirectRawData) {
    for (const key in VEDirectRawData) {
      if (isNaN(VEDirectRawData[key])) {
        this[key] = VEDirectRawData[key];
      } else {
        this[key] = parseInt(VEDirectRawData[key]);
      }
    }
  }

}
class VEDirectParser extends stream.Transform {
  constructor() {
    super({
      readableObjectMode: true
    });
    this.buffer = Buffer.alloc(0);
    this.rawDataBlock = {};
  }

  isChecksumValid() {
    return this.buffer.reduce((prev, curr) => prev + curr & 255, 0) === 0;
  }

  _transform(dataChunk, encoding, callback) {
    const [key, value] = dataChunk.toString().split('\t');

    if (key[0] === ':') {
      callback();
      return;
    }

    this.buffer = Buffer.concat([this.buffer, Buffer.from([0x0d, 0x0a]), dataChunk]);

    if (key === "Checksum") {
      if (this.isChecksumValid()) {
        this.push(this.rawDataBlock);
      }

      this.buffer = Buffer.alloc(0);
      this.rawDataBlock = {};
    } else {
      this.rawDataBlock[key] = value;
    }

    callback();
  }

}

const deviceName = {
  768: "BlueSolar MPPT 70|15",
  41024: "BlueSolar MPPT 75|50",
  41025: "BlueSolar MPPT 150|35",
  41026: "BlueSolar MPPT 75|15",
  41027: "BlueSolar MPPT 100|15",
  41028: "BlueSolar MPPT 100|30",
  41029: "BlueSolar MPPT 100|50",
  41030: "BlueSolar MPPT 150|70",
  41031: "BlueSolar MPPT 150|100",
  41033: "BlueSolar MPPT 100|50 rev2",
  41034: "BlueSolar MPPT 100|30 rev2",
  41035: "BlueSolar MPPT 150|35 rev2",
  41036: "BlueSolar MPPT 75|10",
  41037: "BlueSolar MPPT 150|45",
  41038: "BlueSolar MPPT 150|60",
  41039: "BlueSolar MPPT 150|85",
  41040: "SmartSolar MPPT 250|100",
  41041: "SmartSolar MPPT 150|100",
  41042: "SmartSolar MPPT 150|85",
  41043: "SmartSolar MPPT 75|15",
  41044: "SmartSolar MPPT 75|10",
  41045: "SmartSolar MPPT 100|15",
  41046: "SmartSolar MPPT 100|30",
  41047: "SmartSolar MPPT 100|50",
  41048: "SmartSolar MPPT 150|35",
  41049: "SmartSolar MPPT 150|100 rev2",
  41050: "SmartSolar MPPT 150|85 rev2",
  41051: "SmartSolar MPPT 250|70",
  41052: "SmartSolar MPPT 250|85",
  41053: "SmartSolar MPPT 250|60",
  41054: "SmartSolar MPPT 250|45",
  41055: "SmartSolar MPPT 100|20",
  41056: "SmartSolar MPPT 100|20 48V",
  41057: "SmartSolar MPPT 150|45",
  41058: "SmartSolar MPPT 150|60",
  41059: "SmartSolar MPPT 150|70",
  41060: "SmartSolar MPPT 250|85 rev2",
  41061: "SmartSolar MPPT 250|100 rev2",
  41062: "BlueSolar MPPT 100|20",
  41063: "BlueSolar MPPT 100|20 48V",
  41064: "SmartSolar MPPT 250|60 rev2",
  41065: "SmartSolar MPPT 250|70 rev2",
  41066: "SmartSolar MPPT 150|45 rev2",
  41067: "SmartSolar MPPT 150|60 rev2",
  41068: "SmartSolar MPPT 150|70 rev2",
  41069: "SmartSolar MPPT 150|85 rev3",
  41070: "SmartSolar MPPT 150|100 rev3",
  41071: "BlueSolar MPPT 150|45 rev2",
  41072: "BlueSolar MPPT 150|60 rev2",
  41073: "BlueSolar MPPT 150|70 rev2",
  41218: "SmartSolar MPPT VE.Can 150/70",
  41219: "SmartSolar MPPT VE.Can 150/45",
  41220: "SmartSolar MPPT VE.Can 150/60",
  41221: "SmartSolar MPPT VE.Can 150/85",
  41222: "SmartSolar MPPT VE.Can 150/100",
  41223: "SmartSolar MPPT VE.Can 250/45",
  41224: "SmartSolar MPPT VE.Can 250/60",
  41225: "SmartSolar MPPT VE.Can 250/70",
  41226: "SmartSolar MPPT VE.Can 250/85",
  41227: "SmartSolar MPPT VE.Can 250/100",
  41228: "SmartSolar MPPT VE.Can 150/70 rev2",
  41229: "SmartSolar MPPT VE.Can 150/85 rev2",
  41230: "SmartSolar MPPT VE.Can 150/100 rev2",
  41231: "BlueSolar MPPT VE.Can 150/100",
  41234: "BlueSolar MPPT VE.Can 250/70",
  41235: "BlueSolar MPPT VE.Can 250/100",
  41236: "SmartSolar MPPT VE.Can 250/70 rev2",
  41237: "SmartSolar MPPT VE.Can 250/100 rev2",
  41238: "SmartSolar MPPT VE.Can 250/85 rev2",
  41865: "SmartShunt 500A/50mV",
  41866: "SmartShunt 1000A/50mV",
  41867: "SmartShunt 2000A/50mV"
};

var StatusMessage;

(function (StatusMessage) {
  StatusMessage[StatusMessage["Off"] = 0] = "Off";
  StatusMessage[StatusMessage["Low power"] = 1] = "Low power";
  StatusMessage[StatusMessage["Fault"] = 2] = "Fault";
  StatusMessage[StatusMessage["Bulk"] = 3] = "Bulk";
  StatusMessage[StatusMessage["Absorption"] = 4] = "Absorption";
  StatusMessage[StatusMessage["Float"] = 5] = "Float";
  StatusMessage[StatusMessage["Storage"] = 6] = "Storage";
  StatusMessage[StatusMessage["Equalize (manual)"] = 7] = "Equalize (manual)";
  StatusMessage[StatusMessage["Inverting"] = 9] = "Inverting";
  StatusMessage[StatusMessage["Power supply"] = 11] = "Power supply";
  StatusMessage[StatusMessage["Starting-up"] = 245] = "Starting-up";
  StatusMessage[StatusMessage["Repeated absorption"] = 246] = "Repeated absorption";
  StatusMessage[StatusMessage["Auto equalize / Recondition"] = 247] = "Auto equalize / Recondition";
  StatusMessage[StatusMessage["BatterySafe"] = 248] = "BatterySafe";
  StatusMessage[StatusMessage["External Control"] = 252] = "External Control";
})(StatusMessage || (StatusMessage = {}));

var ErrorMessage;

(function (ErrorMessage) {
  ErrorMessage[ErrorMessage[""] = 0] = "";
  ErrorMessage[ErrorMessage["Battery voltage too high"] = 2] = "Battery voltage too high";
  ErrorMessage[ErrorMessage["Charger temperature too high"] = 17] = "Charger temperature too high";
  ErrorMessage[ErrorMessage["Charger over current"] = 18] = "Charger over current";
  ErrorMessage[ErrorMessage["Charger current reversed"] = 19] = "Charger current reversed";
  ErrorMessage[ErrorMessage["Bulk time limit exceeded"] = 20] = "Bulk time limit exceeded";
  ErrorMessage[ErrorMessage["Current sensor issue (sensor bias/sensor broken)"] = 21] = "Current sensor issue (sensor bias/sensor broken)";
  ErrorMessage[ErrorMessage["Terminals overheated"] = 26] = "Terminals overheated";
  ErrorMessage[ErrorMessage["Converter issue (dual converter models only)"] = 28] = "Converter issue (dual converter models only)";
  ErrorMessage[ErrorMessage["Input voltage too high (solar panel)"] = 33] = "Input voltage too high (solar panel)";
  ErrorMessage[ErrorMessage["Input current too high (solar panel)"] = 34] = "Input current too high (solar panel)";
  ErrorMessage[ErrorMessage["Input shutdown (due to excessive battery voltage)"] = 38] = "Input shutdown (due to excessive battery voltage)";
  ErrorMessage[ErrorMessage["Input shutdown (due to current flow during off mode)"] = 39] = "Input shutdown (due to current flow during off mode)";
  ErrorMessage[ErrorMessage["Lost communication with one of devices"] = 65] = "Lost communication with one of devices";
  ErrorMessage[ErrorMessage["Synchronised charging device configuration issue"] = 66] = "Synchronised charging device configuration issue";
  ErrorMessage[ErrorMessage["BMS connection lost"] = 67] = "BMS connection lost";
  ErrorMessage[ErrorMessage["Network misconfigured"] = 68] = "Network misconfigured";
  ErrorMessage[ErrorMessage["Factory calibration data lost"] = 116] = "Factory calibration data lost";
  ErrorMessage[ErrorMessage["Invalid/incompatible firmware"] = 117] = "Invalid/incompatible firmware";
  ErrorMessage[ErrorMessage["User settings invalid"] = 119] = "User settings invalid";
})(ErrorMessage || (ErrorMessage = {}));

var MPPTMessage;

(function (MPPTMessage) {
  MPPTMessage[MPPTMessage["Off"] = 0] = "Off";
  MPPTMessage[MPPTMessage["Voltage or current limited"] = 1] = "Voltage or current limited";
  MPPTMessage[MPPTMessage["MPP Tracker active"] = 2] = "MPP Tracker active";
})(MPPTMessage || (MPPTMessage = {}));

var OffReasonMessage;

(function (OffReasonMessage) {
  OffReasonMessage[OffReasonMessage[""] = 0] = "";
  OffReasonMessage[OffReasonMessage["No input power"] = 1] = "No input power";
  OffReasonMessage[OffReasonMessage["Switched off (power switch)"] = 2] = "Switched off (power switch)";
  OffReasonMessage[OffReasonMessage["Switched off (device mode register) "] = 4] = "Switched off (device mode register) ";
  OffReasonMessage[OffReasonMessage["Remote input"] = 8] = "Remote input";
  OffReasonMessage[OffReasonMessage["Protection active"] = 10] = "Protection active";
  OffReasonMessage[OffReasonMessage["Paygo"] = 20] = "Paygo";
  OffReasonMessage[OffReasonMessage["BMS"] = 40] = "BMS";
  OffReasonMessage[OffReasonMessage["Engine shutdown detection"] = 80] = "Engine shutdown detection";
  OffReasonMessage[OffReasonMessage["Analysing input voltage"] = 100] = "Analysing input voltage";
})(OffReasonMessage || (OffReasonMessage = {}));

var AlarmReasonMessage;

(function (AlarmReasonMessage) {
  AlarmReasonMessage[AlarmReasonMessage[""] = 0] = "";
  AlarmReasonMessage[AlarmReasonMessage["Low Voltage"] = 1] = "Low Voltage";
  AlarmReasonMessage[AlarmReasonMessage["High Voltage"] = 2] = "High Voltage";
  AlarmReasonMessage[AlarmReasonMessage["Low SOC"] = 4] = "Low SOC";
  AlarmReasonMessage[AlarmReasonMessage["Low Starter Voltage"] = 8] = "Low Starter Voltage";
  AlarmReasonMessage[AlarmReasonMessage["High Starter Voltage"] = 16] = "High Starter Voltage";
  AlarmReasonMessage[AlarmReasonMessage["Low Temperature"] = 32] = "Low Temperature";
  AlarmReasonMessage[AlarmReasonMessage["High Temperature"] = 64] = "High Temperature";
  AlarmReasonMessage[AlarmReasonMessage["Mid Voltage"] = 128] = "Mid Voltage";
})(AlarmReasonMessage || (AlarmReasonMessage = {}));

var DeviceType;

(function (DeviceType) {
  DeviceType[DeviceType["MPPT"] = 0] = "MPPT";
  DeviceType[DeviceType["Inverter"] = 1] = "Inverter";
  DeviceType[DeviceType["BMV"] = 2] = "BMV";
  DeviceType[DeviceType["Charger"] = 3] = "Charger";
})(DeviceType || (DeviceType = {}));

var MonitorType;

(function (MonitorType) {
  MonitorType[MonitorType["Solar charger"] = -9] = "Solar charger";
  MonitorType[MonitorType["Wind turbine"] = -8] = "Wind turbine";
  MonitorType[MonitorType["Shaft generator"] = -7] = "Shaft generator";
  MonitorType[MonitorType["Alternator"] = -6] = "Alternator";
  MonitorType[MonitorType["Fuel cell"] = -5] = "Fuel cell";
  MonitorType[MonitorType["Water generator"] = -4] = "Water generator";
  MonitorType[MonitorType["DC/DC charger"] = -3] = "DC/DC charger";
  MonitorType[MonitorType["AC charger"] = -2] = "AC charger";
  MonitorType[MonitorType["Generic source"] = -1] = "Generic source";
  MonitorType[MonitorType["Battery monitor (BMV)"] = 0] = "Battery monitor (BMV)";
  MonitorType[MonitorType["Generic load"] = 1] = "Generic load";
  MonitorType[MonitorType["Electric drive"] = 2] = "Electric drive";
  MonitorType[MonitorType["Fridge"] = 3] = "Fridge";
  MonitorType[MonitorType["Water pump"] = 4] = "Water pump";
  MonitorType[MonitorType["Bilge pump"] = 5] = "Bilge pump";
  MonitorType[MonitorType["DC System"] = 6] = "DC System";
  MonitorType[MonitorType["Inverter"] = 7] = "Inverter";
  MonitorType[MonitorType["Water heater"] = 8] = "Water heater";
})(MonitorType || (MonitorType = {}));

class VEDirectPnP_UnsupportedDeviceData {
  constructor(VEDirectRawData) {
    //VE.Direct -> UnsupportedDeviceData properties mapping
    const data = new VEDirectData(VEDirectRawData);
    this.deviceName = getDeviceName(data["PID"]);
    this.deviceSN = data["SER#"];
    this.VEDirectData = data;
  }

}
class VEDirectPnP_MPPTDeviceData {
  constructor(VEDirectRawData) {
    //VE.Direct -> MPPTDeviceData properties mapping
    const data = new VEDirectData(VEDirectRawData);
    this.deviceName = getDeviceName(data["PID"]);
    this.deviceSN = data["SER#"];
    this.deviceType = DeviceType[0];
    this.deviceFirmwareVersion = getDeviceFW(data);
    this.batteryVoltage = data["V"] / 1000; //mV -> V

    this.batteryCurrent = data["I"] / 1000; //mA -> A

    this.statusMessage = StatusMessage[data["CS"]];
    this.errorMessage = ErrorMessage[data["ERR"]];
    this.mpptMessage = MPPTMessage[data["MPPT"]];
    this.maximumPowerToday = data["H21"]; // W

    this.maximumPowerYesterday = data["H23"]; // W

    this.totalEnergyProduced = data["H19"] / 100; // kWh

    this.energyProducedToday = data["H20"] / 100; // kWh

    this.energyProducedYesterday = data["H22"] / 100; // kWh

    this.photovoltaicPower = data["PPV"]; // W

    this.photovoltaicVoltage = data["VPV"] / 1000; //mV -> V

    this.photovoltaicCurrent = this.photovoltaicPower / this.photovoltaicVoltage; //A

    this.loadCurrent = data["IL"] ? data["IL"] / 1000 : 0; //mA -> A

    this.loadOutputState = getStringBoolean(data["LOAD"]);
    this.relayState = getStringBoolean(data["Relay"]);
    this.offReasonMessage = OffReasonMessage[data["OR"]];
    this.daySequenceNumber = data["HSDS"];
    this.VEDirectData = data;
  }

}
class VEDirectPnP_SmartShuntDeviceData {
  constructor(VEDirectRawData, deviceSN) {
    //VE.Direct -> BMVDeviceData properties mapping
    const data = new VEDirectData(VEDirectRawData);
    this.deviceName = getDeviceName(data["PID"]);
    this.deviceSN = deviceSN;
    this.deviceType = DeviceType[2];
    this.deviceFirmwareVersion = getDeviceFW(data);
    this.batteryVoltage = data["V"] / 1000; //mV -> V

    this.batteryMinimumVoltage = data["H7"] / 1000; //mV -> V

    this.batteryMaximumVoltage = data["H8"] / 1000; //mV -> V

    this.batteryCurrent = data["I"] / 1000; //mA -> A

    this.batteryCurrentDeepestDischarge = data["H1"] / 1000; //mAh -> Ah

    this.batteryCurrentLatestDischarge = data["H2"] / 1000; //mAh -> Ah

    this.batteryCurrentAverageDischarge = data["H3"] / 1000; //mAh -> Ah

    this.batteryPower = data["P"]; //W

    this.stateOfCharge = data["SOC"] / 1000; //%

    this.monitorType = MonitorType[data["MON"]];
    this.temperature = data["T"]; //celsius

    this.hoursPowerRemaining = getRemainingTime(data["TTG"]); //minutes -> hours

    this.hoursSinceFullCharge = data["H9"] / 3600; //seconds -> hours

    this.alarmState = getStringBoolean(data["Alarm"]);
    this.alarmReason = AlarmReasonMessage[data["AR"]];
    this.batteryCycles = data["H4"];
    this.batteryFullCycles = data["H5"];
    this.batteryConsumedAmpHours = data["CE"] / 1000; //mAh -> Ah

    this.batteryCumulativeAmpHours = data["H6"] / 1000; //mAh -> Ah

    this.totalDischargeHours = data["H17"] / 100; //kWh

    this.totalChargeHours = data["H18"] / 100; //kWh

    this.batterySyncs = data["H10"];
    this.auxiliaryVoltage = data["VS"] / 1000; //mV -> V

    this.auxiliaryMinimumVoltage = data["H15"] / 1000; //mV -> V

    this.auxiliaryMaximumVoltage = data["H16"] / 1000; //mV -> V

    this.batteryMidpointVoltage = data["VM"] / 1000; //mV -> V

    this.batteryMidpointDeviation = data["DM"] / 1000; //%

    this.alarmLowBatteryCount = data["H11"];
    this.alarmHighBatteryCount = data["H12"];
    this.alarmLowAuxiliaryCount = data["H13"];
    this.alarmHighAuxiliaryCount = data["H14"];
    this.VEDirectData = data;
  }

}

function getDeviceName(pid) {
  if (deviceName[pid]) {
    return deviceName[pid];
  }

  return "Unknown Victron Device";
}

function getDeviceFW(VEDirectData) {
  const fw = VEDirectData["FW"] || VEDirectData["FWE"];
  return typeof fw === "number" ? fw / 100 : -1;
}

function getStringBoolean(stringBoolean) {
  return stringBoolean === "ON" || stringBoolean === "On";
}

function getRemainingTime(time) {
  return time > 0 ? time / 60 : null;
}

class VEDirectPnP {
  constructor({
    VEDirectDevicesPath = "/dev/serial/by-id/",
    customVEDirectDevicesPaths = [],
    fallbackSerialNumber = false
  } = {}) {
    this.version = 0.05;
    this.parameters = {
      VEDirectDevicesPath,
      customVEDirectDevicesPaths,
      fallbackSerialNumber
    };
    this.listenersStack = [];
    this.devicesVEDirectData = {};
    this.serialPorts = [];
    this.fluidModeReady = false;
    this.init();
  }

  on(event, callback) {
    const listener = (eventEmmited, eventData) => {
      if (event === eventEmmited || event === "all") {
        callback(eventData);
      }
    };

    this.listenersStack.push(listener);
  }

  emitEvent(event, eventData) {
    for (const listener of this.listenersStack) {
      listener(event, Object.assign(Object.assign({}, eventData), {
        eventName: event
      }));
    }
  }

  getVictronDeviceSN(VEDirectData) {
    return VEDirectData["SER#"] ? VEDirectData["SER#"] : this.parameters.fallbackSerialNumber;
  }

  mapVictronDeviceData(devicesData) {
    const devicesDataMapped = {};

    for (const deviceSN in devicesData) {
      const deviceData = devicesData[deviceSN];

      if (!isNaN(deviceData["MPPT"])) {
        devicesDataMapped[deviceSN] = new VEDirectPnP_MPPTDeviceData(deviceData);
      } else if (deviceData["BMV"] && deviceData["BMV"].match(/SmartShunt/)) {
        devicesDataMapped[deviceSN] = new VEDirectPnP_SmartShuntDeviceData(deviceData, deviceSN);
      } else {
        devicesDataMapped[deviceSN] = new VEDirectPnP_UnsupportedDeviceData(deviceData);
      }
    }

    return devicesDataMapped;
  }

  init() {
    this.initVEDirectDataStreamFromAllDevices().then(() => {
      this.emitEvent("stream-init", {
        message: "VE.Direct devices data stream init"
      });
    }).catch(() => {
      this.emitEvent("error", {
        message: "Failed to get data from VE.Direct devices"
      });
    });
  }

  clean() {
    this.devicesVEDirectData = {};
  }

  reset() {
    this.destroy(() => {
      this.clean();
      this.init();
    });
  }

  closeSerialPorts() {
    return new Promise((resolve, reject) => {
      if (this.serialPorts.length > 0) {
        const serialPortClosePromises = this.serialPorts.map(serialPort => {
          return new Promise((resolve, reject) => {
            serialPort.close(error => {
              if (error) {
                console.error(error);
                reject();
              } else {
                resolve();
              }
            });
          });
        });
        Promise.all(serialPortClosePromises).then(() => {
          this.serialPorts = [];
          resolve();
        }).catch(() => reject);
      } else {
        reject();
      }
    });
  }

  destroy(callback) {
    if (this.serialPorts.length > 0) {
      this.closeSerialPorts().then(() => {
        this.emitEvent("stream-destroy", {
          message: "VE.Direct devices data stream has been destroyed"
        });
        if (callback) callback();
      }).catch(() => {
        this.emitEvent("error", {
          message: "Something went wrong trying to destroy VE.Direct devices data stream"
        });
      });
    }
  }

  getDevicesData() {
    return this.mapVictronDeviceData(this.devicesVEDirectData);
  }

  updateVEDirectDataDeviceData(VEDirectRawData) {
    const serialNumber = this.getVictronDeviceSN(VEDirectRawData);

    if (!serialNumber) {
      this.emitEvent("error", {
        message: "Device does not have a valid serial number.",
        dataDump: VEDirectRawData
      });
      return;
    }

    const cachedDeviceData = this.devicesVEDirectData[serialNumber] || {};
    this.devicesVEDirectData = Object.assign(Object.assign({}, this.devicesVEDirectData), {
      [serialNumber]: Object.assign(Object.assign(Object.assign({}, cachedDeviceData), VEDirectRawData), {
        dataTimeStamp: new Date().getTime()
      })
    });
  }

  getVEDirectDevicesAvailable() {
    return new Promise((resolve, reject) => {
      child_process.exec(`ls ${this.parameters.VEDirectDevicesPath}`, (error, stdout, stderr) => {
        const errorData = error || stderr;

        if (errorData) {
          this.emitEvent("error", {
            message: "Failed to get available VE.Direct devices, try with customVEDirectDevicesPaths option.",
            dataDump: errorData
          });
          reject([]);
          return;
        }

        const rawConsoleResponse = stdout.split('\n');
        const validVEDirectInterfaces = rawConsoleResponse.filter(deviceId => deviceId.indexOf("VE_Direct") !== -1);
        const absoluteDevicesPath = validVEDirectInterfaces.map(device => {
          const absoluteDevicePath = this.parameters.VEDirectDevicesPath + device;
          this.emitEvent("interface-found", {
            message: "Found VE.Direct serial port interface",
            dataDump: absoluteDevicePath
          });
          return absoluteDevicePath;
        });
        resolve(absoluteDevicesPath);
      });
    });
  }

  initVEDirectDataStreamFromAllDevices() {
    return new Promise((resolve, reject) => {
      if (this.parameters.customVEDirectDevicesPaths && this.parameters.customVEDirectDevicesPaths.length > 0) {
        const devicesPromises = this.parameters.customVEDirectDevicesPaths.map(devicePath => this.initDataStreamFromVEDirect(devicePath));
        Promise.all(devicesPromises).then(() => {
          resolve();
        }).catch(() => {
          reject();
        });
      } else {
        this.getVEDirectDevicesAvailable().then(devicesPathsFound => {
          const devicesPromises = devicesPathsFound.map(devicePath => this.initDataStreamFromVEDirect(devicePath));
          Promise.all(devicesPromises).then(() => {
            resolve();
          });
        }).catch(() => {
          reject();
        });
      }
    });
  }

  initDataStreamFromVEDirect(devicePath) {
    return new Promise((resolve, reject) => {
      const port = new SerialPort__default["default"](devicePath, {
        baudRate: 19200,
        dataBits: 8,
        parity: 'none'
      }, err => {
        if (err) {
          this.emitEvent("error", {
            message: `Device ${devicePath} serial port error`,
            dataDump: err
          });
          this.devicesVEDirectData = {};
          reject();
        }
      });
      port.on("open", () => {
        this.emitEvent("device-connection-open", {
          message: "VE.Direct device connected through serial port",
          dataDump: devicePath
        });
      });
      port.on('error', err => {
        this.emitEvent("device-connection-error", {
          message: "VE.Direct device connection error through serial port",
          dataDump: {
            devicePath: devicePath,
            errorDataDump: err
          }
        });
      });
      this.serialPorts.push(port);
      const delimiter = new SerialPort__default["default"].parsers.Delimiter({
        delimiter: Buffer.from([0x0d, 0x0a], 'hex'),
        includeDelimiter: false
      });
      const VEDParser = new VEDirectParser();
      port.pipe(delimiter).pipe(VEDParser);
      VEDParser.on("data", VEDirectRawData => {
        if (!this.devicesVEDirectData[this.getVictronDeviceSN(VEDirectRawData)]) {
          resolve();
        }

        this.updateVEDirectDataDeviceData(VEDirectRawData);
      });
    });
  }

}

module.exports = VEDirectPnP;
