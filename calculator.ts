export type TankCapacity = { [key: string]: number }
export type AverageTankCapacityUnit = { from: number; to: number, values: number[] }

export function tankCapacity(tankCapacity: TankCapacity, avgTankCapacityUnits: AverageTankCapacityUnit[]) {
  return function getVolume(sounding: number) {
    if (sounding % 10) {
      const max = Math.floor(sounding / 10) * 10
      return getCapacityFromUnits(sounding, avgTankCapacityUnits, tankCapacity[max])
    }
    return tankCapacity[sounding]
  }
}

function getCapacityFromUnits(sounding: number, avgTankCapacityUnits: AverageTankCapacityUnit[], max: number) {
  for (let index = 0; index < avgTankCapacityUnits.length; index++) {
    const { from, to, values } = avgTankCapacityUnits[index]

    if (from < sounding && to > sounding) {
      const prev = avgTankCapacityUnits[index-1];

      if (prev.values.length != 9) {
        return max + (function recurse() {
          const acc = prev.values.pop() as number
          return acc + values[sounding - from - 1]
        })()
      }
      return values[sounding % 10 - 1] + max
    }
  }
  return -1
}