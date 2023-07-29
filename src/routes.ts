import { Router } from "express"
import { AuthUser, LogOut, Login, Register } from "./controllers/auth.controller"

export const routes = (router : Router) => {
    router.post('/api/register', Register)
    router.post('/api/login', Login)
    router.get('/api/user', AuthUser)
    router.get('/api/logout', LogOut)
}