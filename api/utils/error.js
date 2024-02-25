export const errorHandler = (statusCode, message) => {
    //javaScript constructor for custom error
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    
    return error;
  };