import dbConnect from "../../lib/dbConnect";
import Card from "../../models/Card";

export default async function handler(req, res) {
  const {
    method,
    query: { tag },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        if (tag) {
          const cards = await Card.find(
            { tags_ar: tag },
            { tags_en: tag }
          ).sort({
            createdAt: -1,
          });
          return res.status(200).json({ success: true, data: cards });
        }

        const cards = await Card.find({}).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: cards });
      } catch (error) {
        return res.status(400).json({ success: false });
      }

    case "POST":
      try {
        const card = await Card.create(req.body);
        return res.status(201).json({ success: true, data: card });
      } catch (error) {
        return res.status(400).json({ success: false });
      }

    default:
      return res.status(400).json({ success: false });
  }
}
