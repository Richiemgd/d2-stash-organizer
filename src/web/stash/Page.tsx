import { Page, PageFlags } from "../../scripts/stash/types";
import { Item } from "../collection/Item";
import "./Page.css";
import { pageName } from "./utils/pageName";
import { useMemo } from "preact/hooks";
import { groupItems } from "../collection/groupItems";

export interface PageProps {
  index: number;
  page: Page;
}

export function Page({ page, index }: PageProps) {
  const indexText =
    (page.flags ?? 0) >= PageFlags.MAIN_INDEX
      ? "Main index"
      : (page.flags ?? 0) >= PageFlags.INDEX
      ? "Index"
      : "";

  const grouped = useMemo(() => groupItems(page.items), [page.items]);

  return (
    <section>
      <h3 class="page-title">
        <span>{pageName(page).replace("#", `${index + 1}`)}</span>
        <span>{indexText}</span>
      </h3>
      <table class="page">
        {Array.from(grouped.values()).map(({ item, quantity }, index) => (
          <Item
            key={item.id ?? index}
            item={item}
            quantity={quantity}
            withLocation={false}
          />
        ))}
      </table>
    </section>
  );
}
