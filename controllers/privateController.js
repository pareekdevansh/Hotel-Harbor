exports.getPrivateData = (req, res, next) => {
  // get user id from token
  console.log("Access provided for private data");
  res.status(200).json({
    success: true,
    data: "Access provided for private data",
  });
};
