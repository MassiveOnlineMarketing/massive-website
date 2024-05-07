import jwt from 'jsonwebtoken';

    const account = await db.account.findFirst({
        where: {
            userId: session.user.id
        }
    })

const decodedToken = jwt.decode(account.id_token);
