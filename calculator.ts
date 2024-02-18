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
      let prevIndex = index - 1

      if (avgTankCapacityUnits[prevIndex].values.length != 9) {
        let acc = 0;
        return max + (function recurse() {
          const { values, to } = avgTankCapacityUnits[prevIndex]
          acc += values.pop() as number
          acc += avgTankCapacityUnits[prevIndex+1].values[(sounding - to) - 1]

          prevIndex && prevIndex--

          if (!prevIndex) return acc

          return recurse()
        })()
      }
      return values[sounding % 10 - 1] + max
    }
  }
  return -1
}