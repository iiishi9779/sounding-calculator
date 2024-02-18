import { assertEquals } from "https://deno.land/std@0.216.0/assert/mod.ts";

import tankCapacityTenths from "./_tank-capacity_tenths.json" with { type: "json" }
import averageTankCapacityUnits from "./_average_tank_capacity_units.json" with { type: "json" }
import { AverageTankCapacityUnit, tankCapacity } from "./calculator.ts";

Deno.test("convert sounding to volume", async (t) => {
  const getVolume = tankCapacity(tankCapacityTenths, averageTankCapacityUnits as AverageTankCapacityUnit[])

  await t.step("convert", () => {
    assertEquals(getVolume(1891), 68656 + 36)
  })

  await t.step("convert", () => {
    assertEquals(getVolume(1755), 63570 + 182)
  })

  await t.step("test 1", () => {
    assertEquals(getVolume(8), 203 + 16 + 36)
  })
})