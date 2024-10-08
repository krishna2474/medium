import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signupInputs } from "@krishnakukreja85/medium-common";
export const userRouter = new Hono();
userRouter.post("/signup", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const body = await c.req.json();
        const { success } = signupInputs.safeParse(body);
        if (!success) {
            c.status(411);
            return c.json({
                message: "Inputs Incorrect",
            });
        }
        const resp = await prisma.user.create({
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                username: body.username,
                password: body.password,
            },
        });
        const token = await sign({ id: resp.id }, c.env.JWT_SECRET);
        return c.json({ msg: "USer Signed Up Successfully!", token: token });
    }
    catch (error) {
        return c.json({ error });
    }
});
userRouter.post("/signin", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const { success } = loginInputs.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs Incorrect",
        });
    }
    const user = await prisma.user.findUnique({
        where: {
            username: body.username,
            password: body.password,
        },
    });
    if (!user) {
        c.status(403);
        return c.json({
            error: "User Not Found",
        });
    }
    else {
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ jwt });
    }
});
