import "./dcvjs/dcv.js"

let auth,
    connection,
    serverUrl;

console.log("Using NICE DCV Web Client SDK version " + dcv.version.versionStr);
document.addEventListener('DOMContentLoaded', main);

function main() {
    response = fetch(
        '/session',
        {
            method: 'GET'
        }
    )
    console.log(response)

    console.log("Setting log level to INFO");
    dcv.setLogLevel(dcv.LogLevel.INFO);

    serverUrl = "https://ec2-65-0-75-1.ap-south-1.compute.amazonaws.com:8443/";

    console.log("Starting authentication with", serverUrl);

    // auth = dcv.authenticate(
    //     serverUrl,
    //     {
    //         promptCredentials: onPromptCredentials,
    //         error: onError,
    //         success: onSuccess
    //     }
    // );
    connect('console', 'eyJraWQiOiJhNTQ4NzI1OS03MTFmLTQ3NWYtYjU1ZS03NWE4YWQ3OWZkMWMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJkY3ZTZXNzaW9uSWQiOiJjb25zb2xlIiwiZGN2U2Vzc2lvblVzZXIiOiJBZG1pbmlzdHJhdG9yIiwiZXhwIjoxNjI0NjIzMjk2LCJpYXQiOjE2MjQ2MTk2OTYsImp0aSI6ImQ1ODcyOGE3LTRhOGItNGMzMi1hYWI1LWVlOGQ4YjAxMjdhOSJ9.1fBg08pj1Dqjv66Zem9sXlICBqh5J7TtPYmb2YObkvHeK-nBMxQXkvaGe8TzbUaSX4QUwy11uw9Fj5RCSpbHE8rqV1BtHS8OWCAifL5ePoZ6Z9KKQ3zgHSS6LYkVOid_GD-6G-4AsY6mJHQAcXe0ZkLKApf3wmZsctcslBN05M4sqUhNRoRuNHarDKrOGrc7Uj_uwXNGZjxoCuP_s1FcepiJChs8Pz82xQ2DFLwHxta6G88FKfFujBO3LMrZ4mhJ8vEtf3_Dy4pYvyN7o5Dbe8Yh4npftPezHZOt9LVr7gGKj2IgZSB5SlVpHIGwWMmQBXMHXf1PFLR4l4vA3AkyRdMBcExIxUyy8weIKzXISzWZO0QPJh4bbVnDk8y3hSpICdovL9yKbB92YfWndOcnGkSX7Z_7vlRsJW8TCopOIuj1LAEJFIdBDQvklJAjVKuo6dO9UBgKpqU7xVLRd7rCGvPKpjfmY31Ru6gfSLwsBx8PeMh9wvWotBxSTSvljjd5')

}

function onPromptCredentials(auth, challenge) {
    // Let's check if in challenge we have a username and password request
    if (challengeHasField(challenge, "username") && challengeHasField(challenge, "password")) {
        auth.sendCredentials({username: "Administrator", password: "password"})
    } else {
        // Challenge is requesting something else...
    }
}

function challengeHasField(challenge, field) {
    return challenge.requiredCredentials.some(credential => credential.name === field);
}

function onError(auth, error) {
    console.log("Error during the authentication: ", error.message);
}

// We connect to the first session returned
function onSuccess(auth, result) {
    let {sessionId, authToken} = {...result[0]};

    connect(sessionId, authToken);
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
