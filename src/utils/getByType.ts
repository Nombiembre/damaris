import type { CollectionEntry } from "astro:content";
import getMonthBySlug from "./getMonthBySlug";

export default function getByType({collection, filter}: {collection: CollectionEntry<'diary'>[], filter: string}) {
  let data = [];

  if (filter === "all" ) {
    data = collection;
    return data;
  }

  data = data = collection.filter(({ slug }) => slug.includes(filter.toLocaleLowerCase()));

  data = data.filter((entry) => entry !== undefined);

  return data;
}
