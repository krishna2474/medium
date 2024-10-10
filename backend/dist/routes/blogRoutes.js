import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInputs, updateBlogInputs, } from "@krishnakukreja85/medium-common";
export const blogRouter = new Hono();
blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    if (!authHeader) {
        c.status(403);
        return c.json({
            error: "Authorization header not found!",
        });
    }
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
        const { success } = createBlogInputs.safeParse(body);
        if (!success) {
            c.status(411);
            return c.json({
                message: "Incorrect Inputs",
            });
        }
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
    try {
        const { success } = updateBlogInputs.safeParse(body);
        if (!success) {
            c.status(411);
            return c.json({
                message: "Incorrect Inputs",
            });
        }
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
    }
    catch (e) {
        return c.json({
            e,
        });
    }
});
blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blogs = await prisma.post.findMany({
        select: {
            id: true,
            author: {
                select: {
                    firstName: true,
                },
            },
            title: true,
            content: true,
            authorId: true,
            publishedDate: true,
        },
    });
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
        select: {
            id: true,
            title: true,
            content: true,
            author: {
                select: {
                    firstName: true,
                    lastName: true,
                },
            },
            publishedDate: true,
        },
    });
    return c.json({
        blog,
    });
});
