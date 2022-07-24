/**
 * Get the average of an array of numbers.
 * @param array - an array of numbers
 * @returns The average of the array.
 */
export const getAverage = (array) => {
  const average = array?.reduce((a, b) => a + parseInt(b), 0) / array?.length;
  return average.toFixed(2);
};
