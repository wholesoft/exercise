export { default } from "next-auth/middleware"

export const config = {
  matcher: ["/workouts", "/account", "/exercises"],
}
