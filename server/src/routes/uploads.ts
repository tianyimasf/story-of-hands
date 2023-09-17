import express from "express";
import { Image } from "../model/image.js";
import { IImage } from "../model/image.js";
import { HandSeries, IHandSeries } from "../model/handSeries.js";
import mongodb from "mongodb";

const router = express.Router();

router.post("/", async (req, res) => {
  // Handle the uploaded files
  const { images, authorToken, authorName, name, desc } = req.body;

  const bulkImages: mongodb.AnyBulkWriteOperation<IImage>[] = [];

  images.forEach(function (image: IImage) {
    bulkImages.push({
      updateOne: {
        filter: { data: image.data },
        update: { $set: image },
        upsert: true,
      },
    });
  });

  const dataList = images.map((image: IImage) => image.data);
  let newHandSeries = undefined;

  try {
    await Image.bulkWrite(bulkImages);
    const query = { data: { $in: dataList } };
    const imageIds = await Image.find(query, { _id: 1 });
    const handSeriesObj = {
      name,
      desc,
      images: imageIds,
      authorToken,
      authorName,
    };
    const result = await HandSeries.updateOne(
      { images: imageIds },
      { $set: handSeriesObj },
      { upsert: true }
    );
    if (result.upsertedCount > 0) {
      newHandSeries = result.upsertedId;
    } else {
      newHandSeries = await HandSeries.find({ images: imageIds }, { _id: 1 });
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(200).json({ errored: true, message: err.message });
    }
  }

  res.status(200).json({
    errored: false,
    message: "Successfully created HandSeries",
    newHandSeries,
  });
});

router.get("/", async (req, res) => {
  const handSeriesDataGrids = [];
  try {
    // get unpopulated handseries
    const handSeries = await HandSeries.find()
      .sort({ _id: 1 })
      .limit(Number(req.query.limit as string));

    // populate the images used in the series
    const handSeriesPopulated: IHandSeries[] = await Promise.all(
      handSeries.map(async (oneHandSeries) => {
        oneHandSeries.images = await Promise.all(
          oneHandSeries.images.map(
            async (image) => (await Image.findOne({ _id: image })) as IImage
          )
        );
        return oneHandSeries;
      })
    );

    // arrange the array in grids, return the data
    while (handSeriesPopulated.length)
      handSeriesDataGrids.push(handSeriesPopulated.splice(0, 20));
    console.log(handSeriesDataGrids.length);
  } catch (err) {
    if (err instanceof Error) {
      res.status(200).json({ errored: true, message: err.message });
    }
  }

  res.status(200).json({ errored: false, handSeriesDataGrids });
});

export default router;
