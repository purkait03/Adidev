import rateLimit from "express-rate-limit";
import { slowDown } from 'express-slow-down'

const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 30,
    delayMs: (used, req) => {
        let extraRequests = used - 30
        // return Math.min(extraRequests * 100, 2000)
        return extraRequests * 100
    },
    maxDelayMs: 2000,
})


const globalHardLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  limit: 100, 
  standardHeaders: 'draft-7', 
  legacyHeaders: false, 
  message: 'Too many requests from this IP, please try again after 15 minutes.',
});

const loginLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 5,
    message: 'Too many login attempts, please try again in a minute.',
})

export const rateLimiter = {
    speedLimiter,
    globalHardLimiter,
    loginLimiter
}