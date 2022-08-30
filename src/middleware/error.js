// eslint-disable-next-line func-names
export default function (err, req, res) {
  return res.status(500).json({ message: err });
}
