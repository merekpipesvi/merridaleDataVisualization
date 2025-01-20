export const calculatePercentageChange = (
    salesData: Record<number, number>,
    currentYear: number, 
    yearToCompare: number | null
  ) => {
    const currentYearSales = salesData[currentYear] || 0;
    const pastYears = yearToCompare === null ? Object.keys(salesData)
      .map(Number)
      .filter((year) => year < currentYear) : [yearToCompare].filter((year) => year < currentYear);
    
  
    if (pastYears.length === 0) return {change: 0, amount: 0}; // No past data
  
    const averagePastSales =
      pastYears.reduce((sum, year) => sum + (salesData[year] ?? 0), 0) /
      pastYears.length;
  
    if (averagePastSales === 0) return {change: 0, amount: 0}; // Avoid division by zero
  
    return {change: ((currentYearSales - averagePastSales) / averagePastSales) * 100, amount: (currentYearSales - averagePastSales) };
  };
  