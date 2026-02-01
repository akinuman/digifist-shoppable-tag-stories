import { groq } from "next-sanity";
import { allPostsQuery } from "./all-posts";
import { carousel1Query } from "./carousel/carousel-1";
import { cta1Query } from "./cta/cta-1";
import { faqsQuery } from "./faqs";
import { gridRowQuery } from "./grid/grid-row";
import { hero1Query } from "./hero/hero-1";
import { hero2Query } from "./hero/hero-2";
import { logoCloud1Query } from "./logo-cloud/logo-cloud-1";
import { sectionHeaderQuery } from "./section-header";
import { splitRowQuery } from "./split/split-row";

export const PAGE_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0]{
    blocks[]{
      ${hero1Query},
      ${hero2Query},
      ${sectionHeaderQuery},
      ${splitRowQuery},
      ${gridRowQuery},
      ${carousel1Query},
      ${cta1Query},
      ${logoCloud1Query},
      ${faqsQuery},
      ${allPostsQuery},
    },
    meta_title,
    meta_description,
    noindex,
    ogImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
    }
  }
`;

export const PAGES_SLUGS_QUERY = groq`*[_type == "page" && defined(slug)]{slug}`;
