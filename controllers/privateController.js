exports.getPrivateData = (req, res, next) => {
  console.log("inside getPrivateData function");
  let user = req.user;
  const userDetails = {
    name: user.name,
    email: user.email,
  };
  console.log("Access provided for private data");
  res.status(200).json({
    success: true,
    data: userDetails,
  });
};
