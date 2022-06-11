import Card from "../models/Card";

export const getAllTags = async () => {
  try {
    return await Card.aggregate([
      {
        $match: {
          tags_ar: { $exists: true },
          tags_en: { $exists: true },
        },
      },
      {
        $project: { _id: 0, tags_ar: 1, tags_en: 1 },
      },
      {
        $facet: {
          arabic_tags: [
            { $unwind: "$tags_ar" },
            { $group: { _id: "$tags_ar", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
          ],
          english_tags: [{ $unwind: "$tags_en" }, { $sortByCount: "$tags_en" }],
        },
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};
