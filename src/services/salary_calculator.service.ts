import { GRA_TAX_RATES, PENSION_RATES } from '@/lib/data/constants'

interface GrossIncomeDetails {
  grossIncome: number
  basicSalary: number
  totalPAYETax: number
  allowances: number
  employeePension: number
  employerPension: number
}

export class SalaryCalculatorService {
  private takeHome: number
  private allowances: number
  private employerPensionRate: number
  private employeePensionRate: number

  constructor(net: number, allowances = 0) {
    this.takeHome = net + allowances
    this.allowances = allowances
    this.employerPensionRate = PENSION_RATES.reduce((a, b) => a + b.employer, 0)
    this.employeePensionRate = PENSION_RATES.reduce((a, b) => a + b.employee, 0)
  }

  private calculateTaxableIncome(grossIncome: number): number {
    const employeePension = grossIncome * this.employeePensionRate
    return grossIncome - employeePension
  }

  private calculateTax(taxableIncome: number): number {
    let tax = 0
    let remainingIncome = taxableIncome
    for (const bracket of GRA_TAX_RATES) {
      if (remainingIncome <= bracket.limit) {
        tax += remainingIncome * bracket.rate
        break
      } else {
        tax += bracket.limit * bracket.rate
        remainingIncome -= bracket.limit
      }
    }
    return tax
  }

  private calculateNetIncome(grossIncome: number): number {
    const taxableIncome = this.calculateTaxableIncome(grossIncome)
    const tax = this.calculateTax(taxableIncome)
    const employeePension = grossIncome * this.employeePensionRate
    return grossIncome - tax - employeePension
  }

  getBreakdown(): GrossIncomeDetails {
    /* Use binary search to find the gross income with a tolerance of .01 */
    const takeHome = this.takeHome
    let low = takeHome
    let high = takeHome * 2
    let grossIncome = (low + high) / 2
    let calculatedNetIncome = this.calculateNetIncome(grossIncome)

    while (Math.abs(calculatedNetIncome - takeHome) > 0.01) {
      if (calculatedNetIncome < takeHome) {
        low = grossIncome
      } else {
        high = grossIncome
      }
      grossIncome = (low + high) / 2
      calculatedNetIncome = this.calculateNetIncome(grossIncome)
    }

    const basicSalary = +(grossIncome - this.allowances).toFixed(2)
    const employeePension = +(grossIncome * this.employeePensionRate).toFixed(2)
    const employerPension = +(grossIncome * this.employerPensionRate).toFixed(2)
    const taxableIncome = +this.calculateTaxableIncome(grossIncome).toFixed(2)
    const totalPAYETax = +this.calculateTax(taxableIncome).toFixed(2)

    return {
      grossIncome: +grossIncome.toFixed(2),
      basicSalary,
      allowances: +this.allowances.toFixed(2),
      totalPAYETax,
      employeePension,
      employerPension
    }
  }
}
