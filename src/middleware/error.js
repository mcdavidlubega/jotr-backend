export default function (err, req, res, next) {
  // Log the exception
  return res.status(500).json({ message: err });
}
