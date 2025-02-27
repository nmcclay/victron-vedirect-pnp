export enum StatusMessage {
    "Off" = 0,
    "Low power" = 1,
    "Fault" = 2,
    "Bulk" = 3,
    "Absorption" = 4,
    "Float" = 5,
    "Storage" = 6,
    "Equalize (manual)" = 7,
    "Inverting" = 9,
    "Power supply" = 11,
    "Starting-up" = 245,
    "Repeated absorption" = 246,
    "Auto equalize / Recondition" = 247,
    "BatterySafe" = 248,
    "External Control" = 252
}

export enum ErrorMessage {
    "" = 0,
    "Battery voltage too high" = 2,
    "Charger temperature too high" = 17,
    "Charger over current" = 18,
    "Charger current reversed" = 19,
    "Bulk time limit exceeded" = 20,
    "Current sensor issue (sensor bias/sensor broken)" = 21,
    "Terminals overheated" = 26,
    "Converter issue (dual converter models only)" = 28,
    "Input voltage too high (solar panel)" = 33,
    "Input current too high (solar panel)" = 34,
    "Input shutdown (due to excessive battery voltage)" = 38,
    "Input shutdown (due to current flow during off mode)" = 39,
    "Lost communication with one of devices" = 65,
    "Synchronised charging device configuration issue" = 66,
    "BMS connection lost" = 67,
    "Network misconfigured" = 68,
    "Factory calibration data lost" = 116,
    "Invalid/incompatible firmware" = 117,
    "User settings invalid" = 119
}


export enum MPPTMessage {
    "Off" = 0,
    "Voltage or current limited" = 1,
    "MPP Tracker active" = 2,
}

export enum OffReasonMessage {
    "" = 0,
    "No input power" = 1,
    "Switched off (power switch)" = 2,
    "Switched off (device mode register) " = 4,
    "Remote input" = 8,
    "Protection active" = 10,
    "Paygo" = 20,
    "BMS" = 40,
    "Engine shutdown detection" = 80,
    "Analysing input voltage" = 100,
}

export enum AlarmReasonMessage {
    "" = 0,
    "Low Voltage" = 1,
    "High Voltage" = 2,
    "Low SOC" = 4,
    "Low Starter Voltage" = 8,
    "High Starter Voltage" = 16,
    "Low Temperature" = 32,
    "High Temperature" = 64,
    "Mid Voltage" = 128
}

export enum DeviceType {
    "MPPT" = 0,
    "Inverter" = 1,
    "BMV" = 2,
    "Charger" = 3
}

export enum MonitorType {
    "Solar charger" = -9,
    "Wind turbine" = -8,
    "Shaft generator" = -7,
    "Alternator" = -6,
    "Fuel cell" = -5,
    "Water generator" = -4,
    "DC/DC charger" = -3,
    "AC charger" = -2,
    "Generic source" = -1,
    "Battery monitor (BMV)" = 0,
    "Generic load" = 1,
    "Electric drive" = 2,
    "Fridge" = 3,
    "Water pump" = 4,
    "Bilge pump" = 5,
    "DC System" = 6,
    "Inverter" = 7,
    "Water heater" = 8
}
