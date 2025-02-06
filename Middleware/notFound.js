const notFound = (req, res, next) => {
   return res.status(404).json({
    status:"fail",
    message: "Page Not Found"
   });
}

export default notFound