import getPrismaInstance from "../utils/PrismaClient.js";

export const checkUser = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.json({ msg: 'Email is required.', status: false });
        }
        const prisma = getPrismaInstance();
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.json({ msg: 'User not found', status: false});
        }
        return res.json({ msg: 'User found', status: true, data: user});
    } catch (err) {
        console.error(err);
        next(err);
    }
}

export const onboardUser = async (req, res, next) => {
    try {
    const { email, name, about, image: profileImage } = req.body;
    if (!email || !name || !profileImage) {
        return res.send("Email, Name and Image are required.");
    }
    const data = {email, name, about, profileImage};
    const prisma = getPrismaInstance();
    const user = await prisma.user.create({
        data,
    });
    return res.json({ msg: "Success", status: true, user});
    } catch (err) {
        console.error(err)
        next(err);
    }
  };