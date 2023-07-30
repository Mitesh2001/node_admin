import { Router } from "express"
import { AuthUser, LogOut, Login, Register, UpdateInfo, UpdatePassword } from "./controllers/auth.controller"
import { AuthMiddleware } from "./middleware/auth.middleware"

export const routes = (router : Router) => {
    router.post('/api/register', Register)
    router.post('/api/login', Login)
    router.get('/api/user', AuthMiddleware, AuthUser)
    router.get('/api/logout', AuthMiddleware, LogOut)
    router.put('/api/users/info', AuthMiddleware, UpdateInfo)
    router.put('/api/users/password', AuthMiddleware, UpdatePassword)
}