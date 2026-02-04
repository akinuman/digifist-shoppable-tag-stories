import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { Image, ShoppingBag, Store, Tag } from "lucide-react";

export const structure = (S: any, context: any) =>
  S.list()
    .title("Shoppable Tag Stories")
    .items([
      // Main Content
      S.listItem()
        .title("Brands")
        .schemaType("brand")
        .icon(Store)
        .child(S.documentTypeList("brand").title("Brands")),

      orderableDocumentListDeskItem({
        type: "storyCategory",
        title: "Story Categories",
        icon: Tag,
        S,
        context,
      }),

      S.listItem()
        .title("Shoppable Posts")
        .schemaType("shoppablePost")
        .icon(Image)
        .child(
          S.documentTypeList("shoppablePost")
            .title("Shoppable Posts")
            .defaultOrdering([{ field: "_createdAt", direction: "desc" }]),
        ),

      S.divider(),

      S.listItem()
        .title("Header")
        .schemaType("header")
        .child(
          S.document()
            .schemaType("header")
            .documentId("header")
            .title("Header Settings"),
        ),

      S.divider(),

      S.listItem()
        .title("Products")
        .schemaType("product")
        .icon(ShoppingBag)
        .child(
          S.documentTypeList("product")
            .title("Products")
            .defaultOrdering([{ field: "title", direction: "asc" }]),
        ),
    ]);
