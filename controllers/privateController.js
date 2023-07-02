exports.getPrivateData = (req, res, next) => {
  console.log("inside getPrivateData function");
  let user = req.user;
  const userDetails = {
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  };
  console.log("Access provided for private data");
  res.send(userDetails);
};
