export const BEIJING_TAX_FREE = 565_239
export const BEIJING_BASE_CAP = 47_103.25

export function calculateAnnualComprehensiveTax(income) {
  const brackets = [
    { limit: 36_000, rate: 0.03, deduction: 0 },
    { limit: 144_000, rate: 0.1, deduction: 2_520 },
    { limit: 300_000, rate: 0.2, deduction: 16_920 },
    { limit: 420_000, rate: 0.25, deduction: 31_920 },
    { limit: 660_000, rate: 0.3, deduction: 52_920 },
    { limit: 960_000, rate: 0.35, deduction: 85_920 },
    { limit: Number.POSITIVE_INFINITY, rate: 0.45, deduction: 181_920 },
  ]

  for (const b of brackets) {
    if (income <= b.limit) return income * b.rate - b.deduction
  }
  return 0
}

function parseISODate(value) {
  // value like "2026-01-30"
  if (!value) return null
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? null : d
}

export function calculateTenure(joinDateISO, leaveDateISO) {
  const joinDate = parseISODate(joinDateISO)
  const leaveDate = parseISODate(leaveDateISO)
  if (!joinDate || !leaveDate) return null

  let years = leaveDate.getFullYear() - joinDate.getFullYear()
  let months = leaveDate.getMonth() - joinDate.getMonth()
  let days = leaveDate.getDate() - joinDate.getDate()

  if (days < 0) {
    months--
    const prevMonthDays = new Date(
      leaveDate.getFullYear(),
      leaveDate.getMonth(),
      0,
    ).getDate()
    days += prevMonthDays
  }
  if (months < 0) {
    years--
    months += 12
  }

  return { years, months, days }
}

export function calculateNValue(tenure) {
  if (!tenure) return null
  const { years, months, days } = tenure

  let nVal = years
  if (months >= 6) nVal += 1
  else if (months > 0 || days > 0) nVal += 0.5

  return nVal
}

export function calculateSeverance({
  avgSalary,
  otherAmount,
  joinDateISO,
  leaveDateISO,
  planType,
  baseType,
}) {
  const tenure = calculateTenure(joinDateISO, leaveDateISO)
  const nVal = calculateNValue(tenure)
  if (!tenure || nVal == null) return null

  let finalN = nVal
  let compBase = avgSalary

  if (baseType === 'legal' && avgSalary > BEIJING_BASE_CAP) {
    compBase = BEIJING_BASE_CAP
    if (finalN > 12) finalN = 12
  }

  let severancePreTax = 0
  if (planType === 'N') {
    severancePreTax = finalN * compBase
  } else if (planType === 'N+1') {
    severancePreTax = finalN * compBase + avgSalary
  } else if (planType === '2N') {
    severancePreTax = 2 * finalN * compBase
  }

  const taxableIncome = severancePreTax - BEIJING_TAX_FREE
  const tax =
    taxableIncome > 0 ? calculateAnnualComprehensiveTax(taxableIncome) : 0

  const severancePostTax = severancePreTax - tax
  const totalFinal = severancePostTax + otherAmount

  return {
    tenure,
    nVal,
    finalN,
    compBase,
    severancePreTax,
    taxableIncome,
    tax,
    severancePostTax,
    otherAmount,
    totalFinal,
  }
}

