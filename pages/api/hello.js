export default function handler(req, res) {
  res.status(200).json(
    { 
      text: 'Hello',
      id: req.query.id,
      date: new Date().toLocaleDateString()
    }
  );
}