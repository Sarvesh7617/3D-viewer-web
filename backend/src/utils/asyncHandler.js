const asyncHandler = (func) => async (req, res, next) => {
  try {
    await func(req, res, next);
  } 
  catch (error) {
    console.error("Error caught in asyncHandler:", error); // Optional, for debugging

    const statusCode = typeof error.statusCode === 'number'
      ? error.statusCode
      : typeof error.status === 'number'
        ? error.status
        : 500;

    res.status(statusCode).json({
      success: false,
      message: error.message || "Internal Server Error"
    });
  }
};



export {asyncHandler};