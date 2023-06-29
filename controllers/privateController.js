exports.getPrivateData = (req, res, next) => {
  console.log("Access provided for private data");
  res.status(200).json({
    success: true,
    data: "Access provided for private data",
  });
};
