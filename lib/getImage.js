import { getPlaiceholder } from "plaiceholder";
import { eyecatchLocal } from "./constants";
import path from "node:path";
import fs from "node:fs/promises";

const getImage = async (src) => {
  if (src === eyecatchLocal.url) {
    const buffer = await fs.readFile(path.join("./public", src));

    const {
      metadata: { height, width },
      ...plaiceholder
    } = await getPlaiceholder(buffer, { size: 10 });

    return {
      ...plaiceholder,
      img: { src, height, width },
    };
  } else {
    const buffer = await fetch(src).then(async (res) =>
      Buffer.from(await res.arrayBuffer())
    );

    const {
      metadata: { height, width },
      ...plaiceholder
    } = await getPlaiceholder(buffer, { size: 10 });

    return {
      ...plaiceholder,
      img: { src, height, width },
    };
  }
};

export default getImage;
