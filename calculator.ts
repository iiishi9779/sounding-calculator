import tankCapacityTenths from "./_tank-capacity_tenths.json" with { type: "json" }
import averageTankCapacityUnits from "./_average_tank_capacity_units.json" with { type: "json" }

type TankCapacity = { [key: string]: number }
type SoundingUnits = { [key: string]: number }
type AverageTankCapacityUnit = SoundingUnits & { from: number; to: number }

function getCapacityData(tankCapacity: TankCapacity, avgTankCapacityUnits: AverageTankCapacityUnit[]) {
  return function getVolume(sounding: number) {
    if (sounding % 10) {
      return getCapacityFromUnits(sounding, avgTankCapacityUnits, tankCapacity[Math.floor(sounding / 10) * 10])
    }

    return tankCapacity[sounding]
  }
}

function getCapacityFromUnits(sounding: number, avgTankCapacityUnits: AverageTankCapacityUnit[], max: number) {
  for (let index = 0; index < avgTankCapacityUnits.length; index++) {
    const { from, to, ...capacityUnits } = avgTankCapacityUnits[index]

    if (from < sounding && to > sounding) return capacityUnits[sounding % 10] + max
  }
  return -1
}

const getVolume = getCapacityData(tankCapacityTenths, averageTankCapacityUnits as AverageTankCapacityUnit[])

console.log(getVolume(1891))