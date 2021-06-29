import "./dcvjs/dcv.js"

let auth,
    connection,
    serverUrl,
    response,
    data;

console.log("Using NICE DCV Web Client SDK version " + dcv.version.versionStr);
document.addEventListener('DOMContentLoaded', main);


async function connection_data() {
    response = await fetch(
        '/instance'
    )
    if (response.ok){
        return await response.json()
    }
    else {
         return "error"
    }
}



async function main() {

    data = await connection_data()
    let connection_token = data.connection_token
    let sess_id = data.session_id
    let public_ip = data.public_ip
    let instance_id = data.instance_id
    console.log("Setting log level to INFO");
    dcv.setLogLevel(dcv.LogLevel.INFO);

    serverUrl = "https://" + instance_id + '.gameflow.tech' + ":8443/";

    console.log("Starting authentication with", serverUrl);
    connect(sess_id, connection_token);

}


function connect(sessionId, authToken) {
    console.log(sessionId, authToken);

    dcv.connect({
        url: serverUrl,
        sessionId: sessionId,
        authToken: authToken,
        divId: "dcv-display",
        callbacks: {
            firstFrame: () => console.log("First frame received")
        }
    }).then(function (conn) {
        console.log("Connection established!");
        connection = conn;
        dcv.enterRelativeMouseMode()
        if (dcv.relativeMouseModeEnabled) {
            console.log("relative mouse mode enabled!")
        }
    }).catch(function (error) {
        console.log("Connection failed with error " + error.message);
    });
}
