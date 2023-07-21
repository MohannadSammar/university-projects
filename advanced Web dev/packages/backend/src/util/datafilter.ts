export const process_data_keywordSearch = (data): EbayProductOffer[] => {
  if (data?.[0]?.searchResult?.[0]?.["@count"] == 0) return [];

  const items = data[0].searchResult[0].item;
  const processed_data: EbayProductOffer[] = [];

  for (let i = 0; i < items.length; i++) {
    const product: EbayProductOffer = {
      name: items[i].title[0],
      image: "https://i.ebayimg.com/images/g/7aYAAOSwWy5dm0GD/s-l300.jpg",
      price: items[i].sellingStatus[0].currentPrice[0].__value__,
      link: items[i].viewItemURL[0],
    };
    processed_data.push(product);
  }
  return processed_data;
};

export const process_data_singleItem = (data): EbayProduct => {
  const images: string[] = [];

  if (data.image) {
    images.push(data.image.imageUrl);
  }
  if (data.additionalImages) {
    images.push(...data.additionalImages.map((img) => img.imageUrl));
  }
  let ebayProduct;

  try {
    ebayProduct = {
      ebay_id: data.itemId,
      price: data.price.value,
      images: images,
      description: data.localizedAspects,
    };
  } catch (err) {
    console.log(data, err);
  }

  return ebayProduct;
};

export const formatToken = (data) => {
  let newToken = "";

  for (let i = 17; i < data.length - 60; i++) {
    newToken += data[i];
  }
  newToken = "Bearer " + newToken;

  return newToken;
};
