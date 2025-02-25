export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    const errorMessages = JSON.parse(error.message);
    return Array.isArray(errorMessages)
      ? errorMessages[0].message
      : errorMessages?.message || "An unknown error occurred";
  } else if (typeof error === "string") {
    return error;
  } else {
    return "An unknown error occurred";
  }
};
