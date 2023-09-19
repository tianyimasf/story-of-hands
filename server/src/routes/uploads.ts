import _ from "lodash";
import express from "express";
import { Image } from "../model/image.js";
import { IImage } from "../model/image.js";
import { HandSeries, IHandSeries } from "../model/handSeries.js";
import mongodb from "mongodb";
import { ObjectId } from "mongodb";
import { IStory, Story } from "../model/story.js";

const router = express.Router();

router.post("/", async (req, res) => {
  // Handle the uploaded files
  const { images, authorToken, authorName, name, desc, email } = req.body;

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
      authorEmail: email,
    };
    const result = await HandSeries.updateOne(
      { images: imageIds },
      { $set: handSeriesObj },
      { upsert: true }
    );
    if (result.upsertedCount > 0) {
      newHandSeries = result.upsertedId;
    } else {
      newHandSeries = await HandSeries.findOne(handSeriesObj, { _id: 1 });
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
        // populate images
        oneHandSeries.images = await Promise.all(
          oneHandSeries.images.map(
            async (image) => (await Image.findOne({ _id: image })) as IImage
          )
        );
        // populate stories if not undefined/null
        if (oneHandSeries.stories && oneHandSeries.stories.length > 0)
          oneHandSeries.stories = await Promise.all(
            oneHandSeries.stories.map(
              async (story) => (await Story.findOne({ _id: story })) as IStory
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

router.get("/getOne", async (req, res) => {
  const handSeriesId = req.query.id as string;

  const handSeries = await HandSeries.findOne({
    _id: new ObjectId(handSeriesId),
  });

  if (!handSeries)
    res.status(200).json({ errored: true, message: "Invalid Hand Series Id." });

  const handSeriesClone = JSON.parse(JSON.stringify(handSeries));
  const populatedImages = await Promise.all(
    handSeries!.images.map(async (image) => {
      const populatedImage = (await Image.findOne({ _id: image })) as IImage;
      return populatedImage;
    })
  );
  handSeriesClone.images = populatedImages;
  res.status(200).json({ errored: false, handSeries: handSeriesClone });
});

// TODO: upload stories

export default router;
