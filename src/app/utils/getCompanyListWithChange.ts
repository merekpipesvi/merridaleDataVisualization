import { calculatePercentageChange } from "./calculatePercentageChange";

export const getCompanyListWithChange = (summary: Record<string, Record<number, number>>, selectedYear: number | null, yearToCompare: number | null): Array<{
    company: string;
    change: number;
    amount: number;
  }> => {
    const currentYear = selectedYear == null ? new Date().getFullYear() : selectedYear;
  
    // Calculate percentage change for each company
    const companyChanges = Object.entries(summary).map(([company, salesData]) => ({
      company,
      change: calculatePercentageChange(salesData, currentYear, yearToCompare).change,
      amount: calculatePercentageChange(salesData, currentYear, yearToCompare).amount,
    }));
  
    // Sort by percentage change (biggest drop first)
    return companyChanges.sort((a, b) => a.amount - b.amount);
  };
  