import express, {Router} from "express";
import { AuthUser, LogOut, Login, Register, UpdateInfo, UpdatePassword } from "./controllers/auth.controller"
import { AuthMiddleware } from "./middleware/auth.middleware"
import { CreateUser, DeleteUser, GetUser, UpdateUser, Users } from "./controllers/user.controller"
import { Permissions } from "./controllers/permission.controller"
import { GetRole, Roles, UpdateRole, createRole } from "./controllers/role.controller"
import { CreateProduct, DeleteProduct, GetProduct, Products, UpdateProduct } from "./controllers/product.controller"
import { Upload } from "./controllers/image.controller"
import { Orders, Export, Chart } from "./controllers/order.controller";

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

    router.get('/api/permissions', AuthMiddleware, Permissions)

    router.get('/api/roles', AuthMiddleware, Roles)
    router.post('/api/roles', AuthMiddleware, createRole)
    router.get('/api/roles/:id', AuthMiddleware, GetRole)
    router.put('/api/roles/:id', AuthMiddleware, UpdateRole)

    router.get('/api/products', AuthMiddleware, Products)
    router.post('/api/products', AuthMiddleware, CreateProduct)
    router.get('/api/products/:id', AuthMiddleware, GetProduct)
    router.put('/api/products/:id', AuthMiddleware, UpdateProduct)
    router.delete('/api/products/:id', AuthMiddleware, DeleteProduct)

    router.post('/api/upload', AuthMiddleware, Upload)
    router.use('/api/uploads', express.static('./uploads'));

    router.get('/api/orders', AuthMiddleware, Orders);
    router.post('/api/export-orders', AuthMiddleware, Export);
    router.get('/api/Chart', AuthMiddleware, Chart);
}