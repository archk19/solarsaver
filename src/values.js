const values = [
  { place: "Andaman and Nicobar Islands", cpu: 6.5 },
  { place: "Andhra Pradesh", cpu: 9 },
  { place: "Arunachal Pradesh", cpu: 5.5 },
  { place: "Assam", cpu: 9 },
  { place: "Bihar", cpu: 6.5 },
  { place: "Chandigarh", cpu: 5.5 },
  { place: "Chhattisgarh", cpu: 7.5 },
  { place: "Daman and Diu", cpu: 3.5 },
  { place: "Delhi", cpu: 9.5 },
  { place: "Goa", cpu: 4.5 },
  { place: "Gujarat", cpu: 6 },
  { place: "Haryana", cpu: 7.5 },
  { place: "Himachal Pradesh", cpu: 5 },
  { place: "Jammu and Kashmir", cpu: 3.5 },
  { place: "Jharkhand", cpu: 3.5 },
  { place: "Karnataka", cpu: 9 },
  { place: "Kerala", cpu: 7.5 },
  { place: "Lakshadeep", cpu: 6.5 },
  { place: "Madya Pradesh", cpu: 7.5 },
  { place: "Maharashtra", cpu: 14.5 },
  { place: "Manipur", cpu: 5.5 },
  { place: "Meghalaya", cpu: 5.5 },
  { place: "Mizoram", cpu: 5.5 },
  { place: "Nagaland", cpu: 7.5 },
  { place: "Odisha", cpu: 6.5 },
  { place: "Puducherry", cpu: 5.5 },
  { place: "Punjab", cpu: 6.5 },
  { place: "Rajasthan", cpu: 8.5 },
  { place: "Sikkim", cpu: 5.5 },
  { place: "Tamil Nadu", cpu: 7.5 },
  { place: "Telagana", cpu: 10.5 },
  { place: "Tripura", cpu: 7.5 },
  { place: "Uttar Pradesh", cpu: 7 },
  { place: "Uttarakhand", cpu: 5 },
  { place: "West Bengal", cpu: 10 }
];
export default values;

export const years = 25;
export const consumptionGrowthRate = 3;
export const govtGrowthRate = 10;
export const sqmToSqf = 9.2903;
export const ppaFactor = 0.75;
export const pricePerKwp = 100000;
export const usableRoof = 0.8;
export const roofToKwp = 0.01;
export const solarHrsPerYear = 5 * 300;

export const cpuForState = place => {
  const value = values.find(item => item.place === place);
  if (value) {
    return value.cpu;
  }
  return 0;
};
