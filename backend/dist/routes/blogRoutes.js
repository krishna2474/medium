import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
export const blogRouter = new Hono();
blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    if (!authHeader) {
        c.status(403);
        return c.json({
            error: "Authorization header not found!",
        });
    }
    console.log(authHeader);
    const token = authHeader.split(" ")[1];
    const isValid = (await verify(token, c.env.JWT_SECRET));
    if (isValid) {
        c.set("authorId", isValid.id);
        await next();
    }
});
blogRouter.post("/", async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: c.get("authorId"),
            },
        });
        return c.json({
            id: blog.id,
        });
    }
    catch (e) {
        return c.json({
            error: e,
        });
    }
});
blogRouter.put("/", async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const updatedBlog = await prisma.post.update({
        where: {
            id: body.id,
        },
        data: {
            title: body.title,
            content: body.content,
        },
    });
    return c.json({
        id: updatedBlog.id,
    });
});
blogRouter.get("/bulk", async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blogs = await prisma.post.findMany();
    return c.json({
        blogs,
    });
});
blogRouter.get("/:id", async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blog = await prisma.post.findFirst({
        where: {
            id,
        },
    });
    return c.json({
        blog,
    });
});
