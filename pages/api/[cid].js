import dbConnect from "../../lib/dbConnect";
import Card from "../../models/Card";

export default async function handler(req, res) {
  const {
    method,
    query: { cid },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const card = await Card.findById(cid);
        return res.status(200).json(card);
      } catch (error) {
        return res.status(400).json({ success: false });
      }

    case "DELETE":
      try {
        await Card.findByIdAndDelete(cid);
        return res.status(204).end();
      } catch (error) {
        return res.status(400).json({ success: false });
      }

    case "PUT":
      try {
        const card = await Card.findByIdAndUpdate(
          cid,
          { $set: req.body },
          { new: true }
        );
        return res.status(200).json({ success: true, data: card });
      } catch (error) {
        return res.status(400).json({ success: false });
      }

    default:
      return res.status(400).json({ success: false });
  }
}
