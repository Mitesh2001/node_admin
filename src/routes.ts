import express, {Router} from "express";
import { AuthUser, LogOut, Login, Register, UpdateInfo, UpdatePassword } from "./controllers/auth.controller"
import { AuthMiddleware } from "./middleware/auth.middleware"
import { CreateUser, DeleteUser, GetUser, UpdateUser, Users } from "./controllers/user.controller"
import { Permissions } from "./controllers/permission.controller"
import { GetRole, Roles, UpdateRole, createRole } from "./controllers/role.controller"
import { CreateProduct, DeleteProduct, GetProduct, Products, UpdateProduct } from "./controllers/product.controller"
import { Upload } from "./controllers/image.controller"
import { Orders, Export } from "./controllers/order.controller";
import { PermissionMiddleware } from "./middleware/permission.middleware";

export const routes = (router : Router) => {
    router.post('/api/register', Register)
    router.post('/api/login', Login)
    router.get('/api/user', AuthMiddleware, AuthUser)
    router.get('/api/logout', AuthMiddleware, LogOut)
    router.put('/api/users/info', AuthMiddleware, UpdateInfo)
    router.put('/api/users/password', AuthMiddleware, UpdatePassword)

    router.get('/api/users', AuthMiddleware, PermissionMiddleware('users'), Users)
    router.post('/api/users', AuthMiddleware, PermissionMiddleware('users'), CreateUser)
    router.get('/api/users/:id', AuthMiddleware, PermissionMiddleware('users'), GetUser)
    router.put('/api/users/:id', AuthMiddleware, PermissionMiddleware('users'), UpdateUser)
    router.delete('/api/users/:id', AuthMiddleware, PermissionMiddleware('users'), DeleteUser)

    router.get('/api/permissions', AuthMiddleware, Permissions)

    router.get('/api/roles', AuthMiddleware, PermissionMiddleware('roles'), Roles)
    router.post('/api/roles', AuthMiddleware, PermissionMiddleware('roles'), createRole)
    router.get('/api/roles/:id', AuthMiddleware, PermissionMiddleware('roles'), GetRole)
    router.put('/api/roles/:id', AuthMiddleware, PermissionMiddleware('roles'), UpdateRole)

    router.get('/api/products', AuthMiddleware, PermissionMiddleware('products'), Products)
    router.post('/api/products', AuthMiddleware, PermissionMiddleware('products'), CreateProduct)
    router.get('/api/products/:id', AuthMiddleware, PermissionMiddleware('products'), GetProduct)
    router.put('/api/products/:id', AuthMiddleware, PermissionMiddleware('products'), UpdateProduct)
    router.delete('/api/products/:id', AuthMiddleware, PermissionMiddleware('products'), DeleteProduct)

    router.post('/api/upload', AuthMiddleware, PermissionMiddleware('products'), Upload)
    router.use('/api/uploads', express.static('./uploads'));

    router.get('/api/orders', AuthMiddleware, PermissionMiddleware('orders'), Orders);
    router.post('/api/export-orders', AuthMiddleware, PermissionMiddleware('orders'), Export);
}