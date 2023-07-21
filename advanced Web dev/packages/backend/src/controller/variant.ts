import { Request, Response } from "express";
import { Variant } from "../entity/Variant";
import { getEbayObject } from "../util/api_conn";
import { process_data_keywordSearch } from "../util/datafilter";
import { getRepository, Repository } from "typeorm";

export const getVariantOffers = async (req: Request, res: Response) => {
  const { id } = req.params;
  const offset: number = parseInt("" + req.query.offset) || 0;

  const variantRepository: Repository<Variant> = getRepository(Variant);
  const variant = await variantRepository.findOne(
    { id: id },
    {
      relations: ["product"],
    }
  );
  const ebay = getEbayObject();

  if (offset % 10 != 0) {
    res.status(500).json({
      status: "Error",
      message: "Offset must be % 10 = 0",
    });
    return;
  }

  if (variant) {
    const apiData = await ebay.findItemsByKeywords({
      keywords:
        variant.product.manufacturer +
        " " +
        variant.product.name +
        " " +
        variant.name,
      Condition: 1000, // new
      topRatedSeller: true,
      pageNumber: offset / 10 + 1,
      entriesPerPage: 10,
    });

    if (apiData?.[0]?.ack?.[0] != "Success") {
      res.status(500).json({
        status: "Error",
        message: "Ebay Error",
      });
      return;
    }

    const processedData: EbayProductOffer[] =
      process_data_keywordSearch(apiData);

    res.status(200).json({
      status: "Success",
      offers: processedData,
    });
  } else {
    res.status(404).json({
      status: "Error",
      message: "Product with provided identifier was not found",
    });
  }
};
