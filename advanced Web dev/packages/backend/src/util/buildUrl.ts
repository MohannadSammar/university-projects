export const buildUrl = (ebayIds: string[]) => {
  let base_url =
    "http://open.api.ebay.com/shopping?callname=GetMultipleItems&responseencoding=JSON&siteid=0&version=1157&ItemID=";
  ebayIds.forEach((id) => (base_url += id + ","));
  return base_url.substring(0, base_url.length - 1);
};
