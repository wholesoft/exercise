import { RateLimiter } from "limiter"

export const limiter = new RateLimiter({
  tokensPerInterval: 999999999999,
  interval: "min",
  fireImmediately: true,
})
