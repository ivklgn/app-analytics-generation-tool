import { EventMap } from "../__generated_types__/analytics";

function Analytics({ app, debug }: { app: string; debug: boolean }) {
  return {
    track(eventName: string, data: Record<string, any>): void {
      if (debug) {
        console.log({ app, eventName, data });
      }
    },
  };
}

const analytics = Analytics({
  app: "my-app",
  debug: true,
});

export function trackEvent<E extends keyof EventMap, K extends keyof EventMap[E] & string>(
  eventName: `${E}.${K}`,
  props: EventMap[E][K]
): void {
  analytics.track(eventName, props as any);
}

trackEvent("basket.favorites_add_item", {
  source_internal: "book",
  landing_id: "123",
  promocode_value: "123",
  ref_url: "https://google.com",
});

trackEvent("basket.cart_remove_item", {
  amount: 100,
  price: 1000,
  user: {
    name: "Alex",
    age: "25",
  },
});

trackEvent("search.search_empty_view", {
  search_id: "123",
  query: "?q=123",
  page_number: 10,
});

trackEvent("auth.auth_popup_view", { languages: [], access_rights: [] });
