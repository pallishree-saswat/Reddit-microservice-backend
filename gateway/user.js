const express = require("express");
const router = express.Router();
const Pool = require('pg').Pool

// nextval('your_sequence_name'::regclass)

const clientConfig = {
    user: "postgres",
    host: 'localhost',
    database: "reddit-backend",
    password: "*****",
    port: 5433
}
const clients = new Pool(clientConfig)


const protoLoader = require("@grpc/proto-loader");
const grpc = require("@grpc/grpc-js");
const PROTO_PATH = __dirname + "/protos/user.proto";

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    defaults: true,
    oneofs: true,
});

const UserService = grpc.loadPackageDefinition(packageDefinition).UserService;
const client = new UserService(
    "127.0.0.1:50050",
    grpc.credentials.createInsecure()
);

router.get("/:id", (req, res) => {
    const { id } = req.params;

    client.getUser({ id }, (err, msg) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, msg: "get user error" });
        } else {
            if (!msg.user)
                return res.status(404).json({ success: true, msg: "user not found" });
            else return res.status(200).json({ success: true, user: msg.user });
        }
    });
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    const createTokenRequest = {
        user: {
            email,
            password,
        },
    };

    client.createToken(createTokenRequest, (err, msg) => {
        if (err) {
            console.error(err);
            return res
                .status(500)
                .json({ success: false, msg: "create token error" });
        } else {
            return res.status(200).json({ success: true, token: msg.token });
        }
    });
});

router.post("/register", (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
        return res
            .status(401)
            .json({ success: false, msg: "missing fields to register user" });

    const createUserRequest = {
        user: {
            email,
            username,
            password,
        },
    };
    client.createUser(createUserRequest, (err, msg) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, msg: "user auth error" });
        } else {
            return res
                .status(200)
                .json({ success: true, msg: "user created", id: msg.id });
        }
    });
});

router.post("/create", (request, response) => {
    const { username, email, password } = request.body

    clients.query('INSERT INTO users (username, email,password) VALUES ($1, $2,$3) RETURNING *', [username, email, password], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
})
module.exports = router;