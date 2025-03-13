import { MetadataProps } from "@/types";
import { siteMeta } from "./siteMeta";

export const generatePageMetadata = ({
  title = siteMeta.defaultTitle,
  description = siteMeta.defaultDescription,
  url = siteMeta.siteUrl,
  image = siteMeta.defaultImage,
}: MetadataProps) => {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image }],
    },
  };
};
