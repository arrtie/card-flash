/** @format */

export const questionToPrimaryKey = (question: string) => {
  return btoa(question);
};

export default questionToPrimaryKey;
