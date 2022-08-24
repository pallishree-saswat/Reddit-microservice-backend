Notes-
------
This is a microservice based reddit application using grpc , protobuff and postgres as database,
 express app as a gateway.


what is RPC?
Remote Procedure Call (RPC) is an interprocess communication technique. The Full form of RPC is Remote Procedure Call. 
It is used for client-server applications. RPC mechanisms are used when a computer program causes a 
procedure or subroutine to execute in a different address space, which is coded as a normal procedure
 call without the programmer specifically coding the details for the remote interaction.

This procedure call also manages low-level transport protocol, such as User Datagram Protocol,
 Transmission Control Protocol/Internet Protocol etc. It is used for carrying the message data between programs.

grpc?

gRPC is a modern open source high performance Remote Procedure Call (RPC) framework that can run in any environment.
It can efficiently connect services in and across data centers with pluggable support for load balancing, tracing,
health checking and authentication. It

protobuff ?
Protocol Buffers
Define your service using Protocol Buffers, a powerful binary serialization toolset and language

User_Service
---------------
create user - http://localhost:5001/user/register
login user - http://localhost:5001/user/login
getuser details = http://localhost:5001/user/userID

"authorization": `Bearer token`

