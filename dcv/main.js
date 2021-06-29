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
        console.log("error")
         return "error"
    }
}

async function main() {

    data = await connection_data()
    console.log(data)
    let connection_token = data.connection_token;
    let sess_id = data.session_id;
    let public_ip = data.public_ip;
    let instance_id = data.instance_id;
    console.log("Setting log level to INFO");
    dcv.setLogLevel(dcv.LogLevel.INFO);

    serverUrl = "https://" + instance_id + '.gameflow.tech' + ":8443/";

    console.log("Starting authentication with", serverUrl);

// auth = dcv.authenticate(
//     serverUrl,
//     {
//         promptCredentials: onPromptCredentials,
//         error: onError,
//         success: onSuccess
//     }
// );
    connect(sess_id, connection_token)

}
