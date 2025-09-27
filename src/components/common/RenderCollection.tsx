import React from "react";
import displayDate from "~/utils/displayTime";
import Typography from "./Typography.tsx";
import type { CollectionEntry } from "astro:content";
import getMonthBySlug from "~/utils/getMonthBySlug";
import { useStore } from "@nanostores/react";
import { $filterStore } from "~/utils/filterStore.js";
import type { filterType } from "~/utils/filterStore.js";
import getByType from "~/utils/getByType.ts";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface RenderCollectionProps {
  collection: CollectionEntry<"diary">[];
  name: string;
  size?: "small";
}

const RenderPost = ({
  post,
  name,
}: {
  post: CollectionEntry<"diary">;
  name: string;
}) => {
  const { slug, data } = post;
  const transitionName = `post-img-${slug}`;
  return (
    <a
      key={slug}
      className="border rounded-xl border-transparent overflow-hidden block cursor-pointer group outline-none focus-visible:border-primary"
      href={`/${name}/${slug}`}
    >
      <div className="aspect-video">
        {data.heroImage ? (
          <img
            data-transition={transitionName}
            src={data.heroImage}
            className="w-full h-full object-cover rounded-t-lg group-focus-within:scale-125 group-hover:scale-125 transition-all duration-300 -z-50"
          />
        ) : (
          <div className="bg-black w-full h-full group-hover:bg-zinc-900  group-focus-within:bg-zinc-900 transition-all duration-300 "></div>
        )}
      </div>
      <div className={`py-1 bg-zinc-900 overflow-hidden isolate`}>
        <Typography as="h2" variant="h4">
          {displayDate(data.date, { day: "numeric" })}
        </Typography>
      </div>
    </a>
  );
};

const AllPosts: React.FC<RenderCollectionProps> = ({ collection, name }) => {
  const postsByMonth = new Map<string, CollectionEntry<"diary">[]>();

  collection.forEach((entry) => {
    const month = getMonthBySlug(entry.slug);
    if (!postsByMonth.has(month)) {
      postsByMonth.set(month, []);
    }
    postsByMonth.get(month)!.push(entry);
  });

  return (
    <div>
      {Array.from(postsByMonth.entries()).map(([month, posts]) => (
        <div key={month}>
          <Typography as="h2" variant="h3" className="text-left pb-1">
            {month}
          </Typography>
          <div className="grid pb-6 gap-2 xl:grid-cols-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {posts.map((post) => {
              return <RenderPost key={post.slug} name={name} post={post} />;
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

const Mosaic = ({
  name,
  month,
  posts,
}: {
  month: filterType;
  name: string;
  posts: CollectionEntry<"diary">[];
}) => {
  return (
    <div
      key={month}
      className={`grid pb-6 gap-2 xl:grid-cols-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}
    >
      {posts.map((post) => {
        return <RenderPost name={name} post={post} />;
      })}
    </div>
  );
};

const RenderCollection: React.FC<RenderCollectionProps> = ({
  collection,
  name,
}) => {
  const filter = useStore($filterStore);
  let data = collection;
  // if (filter !== "all") {
  //   data = getByType({ collection, filter: filter });
  // }

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    // isClient && (
    //   <AnimatePresence mode="wait">
    //     {filter !== "all" ? (
    //       <motion.div
    //         key={filter}
    //         initial={{ opacity: 0 }}
    //         animate={{ opacity: 1 }}
    //         exit={{ opacity: 0 }}
    //         transition={{ duration: 0.15 }}
    //       >
            <Mosaic month={filter} name={name} posts={collection} />
    //       </motion.div>
    //     ) : (
    //       <motion.div
    //         key="all"
    //         initial={{ opacity: 0 }}
    //         animate={{ opacity: 1 }}
    //         exit={{ opacity: 0 }}
    //         transition={{ duration: 0.15 }}
    //       >
              // <AllPosts collection={collection} name={name} /> 
    //  </motion.div>
    //      )}
    //    </AnimatePresence>
    // )
  );
};

export default RenderCollection;
