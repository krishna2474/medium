import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signupInputs, signinInput } from "@krishnakukreja85/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

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
    const userExist = await prisma.user.findFirst({
      where: {
        username: body.username,
      },
    });
    if (userExist) {
      c.status(411);
      return c.json({ msg: "User Exists" });
    }
    const resp = await prisma.user.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        username: body.username,
        password: body.password,
      },
    });
    const now = new Date().toLocaleString();
    await prisma.login.create({
      data: {
        userId: resp.id,
        firstName: body.firstName,
        time: now,
      },
    });
    const token = await sign({ id: resp.id }, c.env.JWT_SECRET);

    return c.json({ msg: "USer Signed Up Successfully!", token: token });
  } catch (error) {
    return c.json({ error });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
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
  } else {
    await prisma.login.create({
      data: {
        userId: user.id,
        firstName: user.firstName,
        time: new Date().toLocaleString(),
      },
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token: jwt });
  }
});
