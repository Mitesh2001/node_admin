import { Router } from "express"
import { AuthUser, LogOut, Login, Register, UpdateInfo, UpdatePassword } from "./controllers/auth.controller"
import { AuthMiddleware } from "./middleware/auth.middleware"
import { CreateUser, DeleteUser, GetUser, UpdateUser, Users } from "./controllers/user.controller"

export const routes = (router : Router) => {
    router.post('/api/register', Register)
    router.post('/api/login', Login)
    router.get('/api/user', AuthMiddleware, AuthUser)
    router.get('/api/logout', AuthMiddleware, LogOut)
    router.put('/api/users/info', AuthMiddleware, UpdateInfo)
    router.put('/api/users/password', AuthMiddleware, UpdatePassword)

    router.get('/api/users', AuthMiddleware, Users)
    router.post('/api/users', AuthMiddleware, CreateUser)
    router.get('/api/users/:id', AuthMiddleware, GetUser)
    router.put('/api/users/:id', AuthMiddleware, UpdateUser)
    router.delete('/api/users/:id', AuthMiddleware, DeleteUser)
}